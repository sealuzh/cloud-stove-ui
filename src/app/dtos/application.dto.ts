import {Ingredient} from './ingredient.dto';
import {RestObject} from './restobject.dto';

export interface Application extends RestObject {
    name: string;
    ingredients: Ingredient[];
}
