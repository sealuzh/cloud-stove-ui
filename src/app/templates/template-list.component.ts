import {Component} from '@angular/core';
import {RouteSegment, Router, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {Ingredient} from '../dtos/ingredient.dto';

import {MarkdownDirective} from '../shared/markdown.component';
import {LoadingComponent} from '../shared/loading.component.ts';

import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    template: require('./template-list.component.html'),
    styles: [require('./template-list.component.scss')],
    directives: [CAROUSEL_DIRECTIVES, ROUTER_DIRECTIVES, MarkdownDirective, LoadingComponent]
})

export class TemplateListComponent {

    public ingredients: Ingredient[];

    constructor(private _router: Router, private _ingredientService: IngredientService) {

    }

    routerOnActivate(curr: RouteSegment): void {
        this.loadTemplates();
    }

    loadTemplates() {
        this._ingredientService.getTemplates().subscribe(
            ingredients => this.ingredients = ingredients,
            error => console.log(error)
        );
    }

    instantiate(id: number) {
      this._ingredientService.instantiate(id).subscribe(
        instanciatedIngredient => {
          this._router.navigate(['/ingredients', instanciatedIngredient.id]);
        },
        error => console.log(error)
      );
    }

}
