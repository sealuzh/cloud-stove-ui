import {Component, OnInit} from '@angular/core';

import {IngredientService} from '../api/services/ingredient.service';
import {Ingredient} from '../api/dtos/ingredient.dto';

@Component({
    template: require('./application-list.component.html'),
    styles: [require('./application-list.component.less')]
})

export class ApplicationListComponent implements OnInit {

    public ingredients: Ingredient[];

    constructor(private _ingredientService: IngredientService) {

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

    copyIngredient(ingredient: any, event: MouseEvent) {
      event.stopPropagation();
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

    deleteIngredient(ingredient: any, event: MouseEvent) {
        event.stopPropagation();
        this._ingredientService.delete(ingredient).subscribe(
            result => {
              this.loadApplications();
            },
            error => {
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
