import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {IngredientService} from '../services/ingredient';
import {Ingredient} from '../dtos/ingredient.dto';

@Component({
    template: require('./ingredient-list.component.html'),
    styles: [require('./ingredient-list.component.scss')],
    directives: [ROUTER_DIRECTIVES]
})

export class IngredientListComponent implements OnActivate {

    public ingredients: Ingredient[];

    constructor(private _ingredientService: IngredientService) {

    }

    routerOnActivate(curr: RouteSegment): void {
        this.loadIngredients();
    }

    loadIngredients() {
        this._ingredientService.query(null).subscribe(
            ingredients => this.ingredients = ingredients,
            error => console.log(error)
        );
    }

}
