import {RestObject} from './restobject.dto';

export interface Resource extends RestObject {
    name: string,
    provider: string,
    cores: string,
    mem_gb?: string
    price_per_hour: string,
    price_per_month: string,
    resource_type: string,
    created_at: Date,
    updated_at: Date,
}
