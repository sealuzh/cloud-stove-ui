import {RestObject} from './restobject.dto';
import {Ingredient} from './ingredient.dto';
import {Resource} from './resource.dto';

export interface Recommendation extends RestObject {
    recommendation: {ingredient: Ingredient, resource: Resource}[];
    application: Ingredient;
    created_at: Date,
    updated_at: Date,
    vm_cost: number;
    total_cost: number;
    num_simultaneous_users: number;
}
