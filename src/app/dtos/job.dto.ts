import {RestObject} from './restobject.dto';

export interface Job extends RestObject {
    vm_cost: number;
    total_cost: number;
}
