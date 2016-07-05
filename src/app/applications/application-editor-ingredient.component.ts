import {Component, ElementRef} from '@angular/core';
import {RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {Ingredient} from '../dtos/ingredient.dto';

import {LoadingComponent} from '../shared/loading.component';
import {DraggableDirective} from './editor/draggable.directive';

@Component({
    selector: 'cs-stove-editor-ingredient',
    template: require('./application-editor-ingredient.component.html'),
    styles: [require('./application-editor-ingredient.component.scss')],
    properties: ['ingredient'],
    directives: [LoadingComponent, ROUTER_DIRECTIVES]
})

export class StoveEditorIngredientComponent {

    ingredient: Ingredient;

    constructor(private _ingredientService: IngredientService, public element: ElementRef) {

    }

    editIngredient(ingredient: Ingredient) {

    }


}
