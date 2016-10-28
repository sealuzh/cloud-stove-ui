import {RestObject} from './restobject.dto';

export interface Constraint extends RestObject {
    ingredient_id?: number;
    type: string;
    source_id?: number;
    target_id?: number;
    min_cpus?: number;
    min_ram?: number;
    preferred_region_area?: string;
    preferred_providers?: string[];
}