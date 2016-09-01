import {Component, OnInit} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {Ingredient} from '../dtos/ingredient.dto';

import {MarkdownDirective} from '../shared/markdown.component';
import {LoadingComponent} from '../shared/loading.component.ts';

import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    template: require('./template-list.component.html'),
    styles: [require('./template-list.component.less')],
    directives: [CAROUSEL_DIRECTIVES, ROUTER_DIRECTIVES, MarkdownDirective, LoadingComponent],
    providers: [IngredientService]
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
