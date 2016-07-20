import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {Ingredient} from '../dtos/ingredient.dto';

import {MarkdownDirective} from '../shared/markdown.component';
import {LoadingComponent} from '../shared/loading.component.ts';

@Component({
    template: require('./application-list.component.html'),
    styles: [require('./application-list.component.scss')],
    directives: [ROUTER_DIRECTIVES, MarkdownDirective, LoadingComponent]
})

export class ApplicationListComponent implements OnInit {

    public ingredients: Ingredient[];

    constructor(private _ingredientService: IngredientService, private _route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.loadApplications();
    }

    loadApplications() {
        this._ingredientService.applications().subscribe(
            ingredients => this.ingredients = ingredients,
            error => console.log(error)
        );
    }

    copyIngredient(ingredient: any) {
      ingredient.isCopying = true;
      this._ingredientService.copy(ingredient.id).subscribe(
        copiedIngredient => {
          ingredient.isCopying = false;
          this.ingredients.push(copiedIngredient);
        },
        error => {
          ingredient.isCopying = false;
          console.log(error);
        }
      );
    }

    countConstraints(ingredient: Ingredient, count?: number): number {
      if (!count) {
        count = ingredient.constraints.length;
      }

      if (ingredient.children.length === 0) {
        return ingredient.constraints.length;
      }

      for (ingredient of ingredient.children) {
        count += this.countConstraints(ingredient, count);
      }

      return count;
    }

    countIngredients(ingredient: Ingredient, count?: number): number {
      if (!count) {
        count = 0;
      }

      if (ingredient.children.length === 0) {
        return 1;
      }

      for (ingredient of ingredient.children) {
        count += this.countIngredients(ingredient, count);
      }

      return count;
    }

}
