import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../api/services/resource.service';
import { Resource } from '../api/dtos/resource.dto';
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
        {title: 'Price per vCPU per Hour ($)', name: 'price_per_vcpu_range'},
        {title: 'Price per GB of RAM per Hour ($)', name: 'price_per_ram_gb_range'},
    ];

    public config: any = {
        paging: false,
        sorting: {columns: this.columns},
        filtering: {regionFilter: 'US'},
        className: ['table-striped', 'table-pricing']
    };

    constructor(private _resourceService: ResourceService) {

    }

    ngOnInit(): void {
        this.loadResources();
    }

    loadResources() {
        this._resourceService.query().subscribe(result => {
            this.resources = [];
            let groupedByRegion: any[] = groupBy(result, 'region_area');

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

            this.providers = this.resources.map(item => item.provider);
            this.providers = this.providers.filter((item, pos) => this.providers.indexOf(item) === pos);

            this.regions = this.resources.map(item => item.region_area);
            this.regions = this.regions.filter((item, pos) => this.regions.indexOf(item) === pos);

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

        this.onChangeTable();
    }

    setProvider(provider: string) {
        if (this.config.filtering.providerFilter === provider) {
            this.config.filtering.providerFilter = null;
        } else {
            this.config.filtering.providerFilter = provider;
        }

        this.onChangeTable();
    }

    onChangeTable() {
        this.filteredResources = this.changeFilter(this.resources, this.config);
        this.changeSort(this.filteredResources, this.config);
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
  }

}
