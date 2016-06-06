import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {Ingredient} from '../dtos/ingredient.dto';
import {IngredientService} from '../services/ingredient';
import {FormlyConfig, FormlyForm, FormlyMessages, FormlyBootstrap, TemplateDirectives} from 'ng2-formly';
import {IngredientForm} from '../forms/ingredient.form';
import {IngredientMap} from './ingredients-map/ingredient-map.component';

@Component({
    template: require('./ingredient-detail.component.html'),
    styles: [require('./ingredient-detail.component.scss')],
    directives: [ROUTER_DIRECTIVES, FormlyForm, IngredientMap],
    providers: [FormlyConfig, FormlyMessages, FormlyBootstrap]
})

export class IngredientDetailComponent implements OnActivate {

    ingredient: Ingredient;
    ingredientFields;
    ingredientMapData;

    constructor(fm: FormlyMessages, fc: FormlyConfig, private _ingredientService: IngredientService) {

        fm.addStringMessage('required', 'This field is required.');
        fm.addStringMessage('maxlength', 'Maximum Length Exceeded.');
        fm.addStringMessage('minlength', 'Should have atleast 2 Characters');

        ['input', 'checkbox'].forEach((field) => {
            fc.setType({
                name: field,
                component: TemplateDirectives[field]
            });
        });

        this.ingredientFields = IngredientForm.ingredientFields();

        // TODO: construct dynamically
        this.ingredientMapData = {
            'nodes': [
                {'name': 'Ingredient A', 'group': 1},
                {'name': 'Ingredient B', 'group': 1},
                {'name': 'Ingredient C', 'group': 1},
                {'name': 'Ingredient E', 'group': 1},
            ],
            'links': [
                {'source': 1, 'target': 0, 'value': 1},
                {'source': 2, 'target': 0, 'value': 8},
                {'source': 3, 'target': 0, 'value': 10},
                {'source': 3, 'target': 2, 'value': 6},
            ]
        };

    }

    submit(ingredientObj) {
        this._ingredientService.save(ingredientObj).subscribe(
            ingredient => this.ingredient = ingredient,
            error => console.log(error)
        );
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadIngredient(id);
    }

    loadIngredient(id: String) {
        this._ingredientService.get(id).subscribe(
            ingredient => this.ingredient = ingredient,
            error => console.log(error)
        );
    }

}
