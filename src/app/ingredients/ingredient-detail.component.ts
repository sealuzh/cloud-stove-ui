import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {Ingredient} from '../dtos/ingredient.dto';
import {IngredientService} from '../services/ingredient';
import {FormlyConfig, FormlyForm, FormlyMessages, FormlyBootstrap, TemplateDirectives} from 'ng2-formly';
import {IngredientForm} from '../forms/ingredient.form';

@Component({
    template: require('./ingredient-detail.component.html'),
    styles: [require('./ingredient-detail.component.scss')],
    directives: [ROUTER_DIRECTIVES, FormlyForm],
    providers: [FormlyConfig, FormlyMessages, FormlyBootstrap]
})

export class IngredientDetailComponent implements OnActivate {

    ingredient: Ingredient;
    ingredientFields;

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
