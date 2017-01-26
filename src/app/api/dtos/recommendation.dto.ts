/**
 * @module ApiModule
 */ /** */

import {RestObject} from './restobject.dto';
import {Ingredient} from './ingredient.dto';
import {Resource} from './resource.dto';

export interface Recommendation extends RestObject {
    recommendation: {ingredient: Ingredient, resource: Resource, resource_count: number}[];
    application: Ingredient;
    created_at: string,
    updated_at: string,
    vm_cost: number;
    total_cost: number;
    status: string;
    num_simultaneous_users: number;
}
