import {Component, ChangeDetectorRef, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {Ingredient} from '../dtos/ingredient.dto';
import {LoadingComponent} from '../shared/loading.component';

@Component({
    selector: 'cs-stove-editor-ingredient',
    template: require('./application-editor-ingredient.component.html'),
    styles: [require('./application-editor-ingredient.component.scss')],
    directives: [LoadingComponent],
})

export class StoveEditorIngredientComponent {

    @Input()
    ingredient: Ingredient;

    @Output()
    ingredientClicked: any = new EventEmitter();

    constructor(public element: ElementRef, private _ref: ChangeDetectorRef) {

    }

    open() {
        this.ingredientClicked.emit(this.ingredient);
    }

}
