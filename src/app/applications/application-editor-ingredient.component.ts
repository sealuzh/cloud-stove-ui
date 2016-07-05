import {Component, ElementRef} from '@angular/core';
import {RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {Ingredient} from '../dtos/ingredient.dto';

import {LoadingComponent} from '../shared/loading.component';
import {DraggableDirective} from './editor/draggable.directive';

import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap';

import {IngredientDetailComponent} from '../ingredients/ingredient-detail.component';

@Component({
    selector: 'cs-stove-editor-ingredient',
    template: require('./application-editor-ingredient.component.html'),
    styles: [require('./application-editor-ingredient.component.scss')],
    properties: ['ingredient'],
    directives: [LoadingComponent, ROUTER_DIRECTIVES, MODAL_DIRECTVES, IngredientDetailComponent],
    viewProviders:[BS_VIEW_PROVIDERS],
})

export class StoveEditorIngredientComponent {

    ingredient: Ingredient;

    constructor(private _ingredientService: IngredientService, public element: ElementRef) {

    }

}
