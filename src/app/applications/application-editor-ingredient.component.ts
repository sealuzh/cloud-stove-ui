import {Component, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

import {Ingredient} from '../dtos/ingredient.dto';

import {LoadingComponent} from '../shared/loading.component';

import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap';

import {IngredientDetailComponent} from '../ingredients/ingredient-detail.component';

@Component({
    selector: 'cs-stove-editor-ingredient',
    template: require('./application-editor-ingredient.component.html'),
    styles: [require('./application-editor-ingredient.component.scss')],
    properties: ['ingredient'],
    directives: [LoadingComponent, MODAL_DIRECTVES, IngredientDetailComponent],
    viewProviders: [BS_VIEW_PROVIDERS],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class StoveEditorIngredientComponent {

    @Input()
    ingredient: Ingredient;

    @Output() ingredientChange: any = new EventEmitter(); updateData(event) {
     this.ingredient = event;
     this.ingredientChange.emit(event);
    }

    constructor(private ref: ChangeDetectorRef, public element: ElementRef) {

    }

}
