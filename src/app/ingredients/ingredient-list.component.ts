import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../api/services/ingredient.service';
import { Ingredient } from '../api/dtos/ingredient.dto';

@Component({
    template: require('./ingredient-list.component.html'),
    styles: [require('./ingredient-list.component.less')]
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
