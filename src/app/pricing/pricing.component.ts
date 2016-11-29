import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../api/services/resource.service';
import { Resource } from '../api/dtos/resource.dto';

@Component({
    template: require('./pricing.component.html'),
    styles: [require('./pricing.component.less')]
})

export class PricingComponent implements OnInit {

    public resources: Resource[];
    public filteredResources: Resource[];
    public regionDropdown: { isOpen: boolean } = { isOpen: false };

    public columns: any = [
        {title: 'Name', name: 'name'},
        {title: 'Provider', name: 'provider'},
        {title: 'CPU-Cores (#)', name: 'cores'},
        {title: 'Memory (GB)', name: 'mem_gb'},
        {title: 'Price per Hour ($)', name: 'price_per_hour'},
        {title: 'Price per Month ($)', name: 'price_per_month'},
        {title: 'Price per vCPU ($)', name: 'price_per_vcpu'},
        {title: 'Price per GB of RAM ($)', name: 'price_per_ram_gb'},
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
            this.resources = result;

            for (let resource of this.resources){
                resource.price_per_vcpu = Math.round(resource.price_per_hour / resource.cores * 1000) / 1000;
                resource.price_per_ram_gb = Math.round(resource.price_per_hour / resource.mem_gb * 1000) / 1000;
            }

            this.onChangeTable(this.config);
        }, error => {

        });
    }

    setRegion(region: string) {
        this.config.filtering.regionFilter = region;
        this.onChangeTable(this.config);
    }

    onChangeTable(config: any) {
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        this.filteredResources = this.changeFilter(this.resources, this.config);
        this.changeSort(this.filteredResources, this.config);

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
            if (columns[i].sort !== '' && columns[i].sort !== false) {
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
