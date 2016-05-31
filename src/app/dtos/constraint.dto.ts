import {RestObject} from './restobject.dto';

export interface Constraint extends RestObject {
    ingredient_id: number;
    type: string;
    source_id: number;
    target_id: number;
}
