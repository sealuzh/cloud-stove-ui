import {RestObject} from './restobject.dto';

export interface Recommendation extends RestObject {
    ingredients: {};
    vm_cost: number;
    total_cost: number;
}
