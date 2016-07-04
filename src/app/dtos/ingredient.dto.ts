import {Constraint} from './constraint.dto';
import {Resource} from './resource.dto';
import {RestObject} from './restobject.dto';

export interface Ingredient extends RestObject {
    name: string;
    body?: string;
    parent_id?: number;
    template_id?: number;
    is_template?: boolean;
    recommendation?: Resource;
    constraints?: Constraint[];
    children?: Ingredient[];
}
