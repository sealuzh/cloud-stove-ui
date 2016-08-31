import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {Ingredient} from '../dtos/ingredient.dto';

import {LoadingComponent} from '../shared/loading.component';

@Component({
    template: require('./recommendation-list.component.html'),
    styles: [require('./recommendation-list.component.less')],
    directives: [ROUTER_DIRECTIVES, LoadingComponent]
})

export class RecommendationListComponent implements OnInit {

    public applications: Ingredient[];

    constructor(private _ingredientService: IngredientService) {

    }

    ngOnInit(): void {
      this._ingredientService.applications().subscribe(result => this.applications = result, error => console.error(error));
    }

}
