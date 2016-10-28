import { Component, OnInit } from '@angular/core';

import { IngredientService } from '../api/services/ingredient.service';
import { Ingredient } from '../api/dtos/ingredient.dto';

@Component({
    template: require('./recommendation-list.component.html'),
    styles: [require('./recommendation-list.component.less')]
})

export class RecommendationListComponent implements OnInit {

    public applications: Ingredient[];

    constructor(private _ingredientService: IngredientService) {

    }

    ngOnInit(): void {
      this._ingredientService.applications().subscribe(result => this.applications = result, error => console.error(error));
    }

}
