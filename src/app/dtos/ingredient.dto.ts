import {Constraint} from './constraint.dto';
import {RestObject} from './restobject.dto';

export interface Ingredient extends RestObject {
    name: string;
    body?: string;
    parent_id?: number;
    template_id?: number;
    is_template?: boolean;
    constraints?: Constraint[];
    children?: Ingredient[];
}
