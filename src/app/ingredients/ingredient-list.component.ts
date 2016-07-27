import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {IngredientService} from '../services/ingredient';
import {Ingredient} from '../dtos/ingredient.dto';
import {LoadingComponent} from '../shared/loading.component';

@Component({
    template: require('./ingredient-list.component.html'),
    styles: [require('./ingredient-list.component.scss')],
    directives: [ROUTER_DIRECTIVES, LoadingComponent],
    providers: [IngredientService]
})

export class IngredientListComponent implements OnInit {

    public ingredients: Ingredient[];

    constructor(private _ingredientService: IngredientService) {

    }

    ngOnInit(): void {
        this.loadIngredients();
    }

    loadIngredients() {
        this._ingredientService.query(null).subscribe(
            ingredients => this.ingredients = ingredients,
            error => console.log(error)
        );
    }

}
