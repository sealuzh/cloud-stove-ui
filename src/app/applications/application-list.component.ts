import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {Ingredient} from '../dtos/ingredient.dto';

import {MarkdownDirective} from '../shared/markdown.component';
import {LoadingComponent} from '../shared/loading.component.ts';

@Component({
    template: require('./application-list.component.html'),
    styles: [require('./application-list.component.scss')],
    directives: [ROUTER_DIRECTIVES, MarkdownDirective, LoadingComponent]
})

export class ApplicationListComponent implements OnActivate {

    public ingredients: Ingredient[];

    constructor(private _ingredientService: IngredientService) {

    }

    routerOnActivate(curr: RouteSegment): void {
        this.loadApplications();
    }

    loadApplications() {
        this._ingredientService.getApplications().subscribe(
            ingredients => this.ingredients = ingredients,
            error => console.log(error)
        );
    }

    copyIngredient(id: number) {
      this._ingredientService.copy(id).subscribe(
        copiedIngredient => this.ingredients.push(copiedIngredient),
        error => console.log(error)
      );
    }

}
