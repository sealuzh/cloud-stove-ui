import {Constraint} from './constraint.dto';
import {RestObject} from './restobject.dto';

export interface Ingredient extends RestObject {
    name: string;
    body: string;
    created_at: Date;
    updated_at: Date;
    parent_id: Number;
    template_id: Number;
    is_template: boolean;
    constraints: Constraint[];
}
