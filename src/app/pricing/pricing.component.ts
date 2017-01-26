/**
 * @module PricingModule
 */ /** */
 
import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../api/services/resource.service';
import { ProviderService } from '../api/services/provider.service';
import { Resource } from '../api/dtos/resource.dto';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

let groupBy = require('lodash.groupby');

@Component({
    template: require('./pricing.component.html'),
    styles: [require('./pricing.component.less')]
})

export class PricingComponent implements OnInit {

    public resources: Resource[];
    public filteredResources: Resource[];

    public providers: String[];
    public regions: String[];

    public columns: any = [
        {title: 'Name', name: 'name'},
        {title: 'Region', name: 'region_area'},
        {title: 'Provider', name: 'provider'},
        {title: 'Cores (#)', name: 'cores'},
        {title: 'Memory (GB)', name: 'mem_gb'},
        {title: 'Price per Hour ($)', name: 'price_per_hour_range'},
        {title: 'vCPU per Hour ($)', name: 'price_per_vcpu_range'},
        {title: 'GB of RAM per Hour ($)', name: 'price_per_ram_gb_range'},
    ];

    public config: any = {
        sorting: {columns: this.columns},
        filtering: {regionFilter: null, providerFilter: null}
    };

    constructor(private _resourceService: ResourceService, private _providerService: ProviderService) {

    }

    ngOnInit(): void {
        // gather available areas and providers from API
        let areasObservable = this._resourceService.regionAreas();
        areasObservable.subscribe(result => {
            this.regions = result;
            this.config.filtering.regionFilter = this.regions[0];
        });

        let providerObservable = this._providerService.names();
        providerObservable.subscribe(result => {
            this.providers = result;
            this.config.filtering.providerFilter = this.providers[0];
        });

        // using Observable.zip, we make sure both calls have finished before constructing our table
        Observable.zip(areasObservable, providerObservable).subscribe(result => {
            this.loadResources();
        });
    }

    loadResources() {
        this.resources = null;
        let searchParams = new URLSearchParams();

        if (this.config.filtering.regionFilter) {
            searchParams.set('region_area', this.config.filtering.regionFilter);
        }

        if (this.config.filtering.providerFilter) {
            searchParams.set('provider_name', this.config.filtering.providerFilter);
        }

        this._resourceService.query(searchParams).subscribe(result => {
            this.resources = [];
            let groupedByRegion: any[] = groupBy(result, 'region_area');

            // merge duplicate resources as we don't allow users filtering per data-center. this calcs the min/max of prices
            // for different regions, so that two identical resources (f.E. basic-a0) with different prices (5$ in eu-west-1 vs
            // 10$ in eu-west-2) become one basic-a0 with a variable price range as property
            for (let regionKey in groupedByRegion) {
                if (groupedByRegion.hasOwnProperty(regionKey)) {
                    let groupedByName: any[] = groupBy(groupedByRegion[regionKey], 'name');
                    for (let resourceKey in groupedByName) {
                        if (groupedByName.hasOwnProperty(resourceKey)) {
                            let array = groupedByName[resourceKey];
                            let resource: any = {};

                            resource.price_per_hour_range =
                                this.round(Math.min.apply(this, array.map(item => item.price_per_hour)))
                                + ' - ' +
                                this.round(Math.max.apply(this, array.map(item => item.price_per_hour)));

                            resource.price_per_vcpu_range =
                                this.round(Math.min.apply(this, array.map(item => item.price_per_hour / item.cores)))
                                + ' - ' +
                                this.round(Math.max.apply(this, array.map(item => item.price_per_hour / item.cores)));

                            resource.price_per_ram_gb_range =
                                this.round(Math.min.apply(this, array.map(item => item.price_per_hour / item.mem_gb)))
                                + ' - ' +
                                this.round(Math.max.apply(this, array.map(item => item.price_per_hour / item.mem_gb)));

                            Object.assign(resource, array[0]);
                            this.resources.push(resource);
                        }
                    }
                }
            }

            this.onChangeTable();
        }, error => {

        });
    }

    round(number: number) {
        return Math.round(number * 1000) / 1000;
    }

    setRegion(region: string) {
        if (this.config.filtering.regionFilter === region) {
            this.config.filtering.regionFilter = null;
        } else {
            this.config.filtering.regionFilter = region;
        }

        this.loadResources();
    }

    setProvider(provider: string) {
        if (this.config.filtering.providerFilter === provider) {
            this.config.filtering.providerFilter = null;
        } else {
            this.config.filtering.providerFilter = provider;
        }

        this.loadResources();
    }

    onChangeTable() {
        this.filteredResources = this.changeFilter(this.resources, this.config);
        this.filteredResources = this.changeSort(this.filteredResources, this.config);
    }

    orderBy(column: any) {
        let sort = column.sort;
        this.columns.forEach(item => item.sort = false);
        column.sort = sort === 'desc' ? 'asc' : 'desc';
        this.onChangeTable();
    }

    changeFilter(data: Resource[], config: any): Resource[] {
        let filteredData: Resource[] = data;

        if (config.filtering.regionFilter) {
            filteredData = filteredData.filter((item: Resource) => item.region_area === config.filtering.regionFilter);
        }

        if (config.filtering.providerFilter) {
            filteredData = filteredData.filter((item: Resource) => item.provider === config.filtering.providerFilter);
        }

        return filteredData;
    }

    changeSort(data: any, config: any) {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== undefined && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });

        return data;
  }

}
