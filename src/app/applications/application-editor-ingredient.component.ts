import {Component, ChangeDetectorRef, ElementRef, Input, Output, EventEmitter} from '@angular/core';
import {Ingredient} from '../dtos/ingredient.dto';
import {LoadingComponent} from '../shared/loading.component';

@Component({
    selector: 'cs-stove-editor-ingredient',
    template: require('./application-editor-ingredient.component.html'),
    styles: [require('./application-editor-ingredient.component.less')],
    directives: [LoadingComponent],
})

export class StoveEditorIngredientComponent {

    @Input()
    ingredient: Ingredient;

    @Output()
    edit: any = new EventEmitter();

    @Output()
    select: any = new EventEmitter();

    constructor(public element: ElementRef, private _ref: ChangeDetectorRef) {

    }

    editIngredient() {
        this.edit.emit(this.ingredient);
    }

    selectIngredient() {
        this.select.emit(this.ingredient);
    }

    hasChildren() {
      return this.ingredient.children.length > 0;
    }

    isHigh() {
      return this.ingredient.recommendation
      && this.ingredient.recommendation.price_per_month > this.ingredient.recommendation.avg_vm_cost * 1.5;
    }

    isNormal() {
      return this.ingredient.recommendation
      && this.ingredient.recommendation.price_per_month < this.ingredient.recommendation.avg_vm_cost
      && this.ingredient.recommendation.price_per_month > (this.ingredient.recommendation.avg_vm_cost * 0.75);
    }

    isLow() {
      return this.ingredient.recommendation
      && this.ingredient.recommendation.price_per_month <= (this.ingredient.recommendation.avg_vm_cost * 0.75);
    }

}
