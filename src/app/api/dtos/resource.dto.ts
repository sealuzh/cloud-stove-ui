import {RestObject} from './restobject.dto';

export interface Resource extends RestObject {
    name: string;
    provider: string;
    cores: number;
    mem_gb?: number;
    region: string;
    region_area: string;
    price_per_hour: number;
    price_per_month: number;
    avg_vm_cost?: number;
    price_per_vcpu?: number;
    price_per_ram_gb?: number;
    resource_type: string;
    created_at: Date;
    updated_at: Date;
}
