/**
 * @module TemplatesModule
 * 
 */ /** */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IngredientService } from '../api/services/ingredient.service';
import { Ingredient } from '../api/dtos/ingredient.dto';

@Component({
    template: require('./template-list.component.html'),
    styles: [require('./template-list.component.less')]
})

export class TemplateListComponent implements OnInit {

    public ingredients: Ingredient[];

    constructor(private _ingredientService: IngredientService, private _router: Router) {

    }

    ngOnInit(): void {
        this.loadTemplates();
    }

    loadTemplates() {
        return this._ingredientService.templates().subscribe(
            ingredients => this.ingredients = ingredients,
            error => console.log(error)
        );
    }

    instantiate(id: number) {
      this._ingredientService.instantiate(id).subscribe(
        instanciatedIngredient => {
          this._router.navigate(['applications', instanciatedIngredient.id]);
        },
        error => console.log(error)
      );
    }

}
