/**
 * @module ApplicationsModule
 */ /** */

import { Component, ChangeDetectorRef, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../api/dtos/ingredient.dto';

@Component({
    selector: 'cs-stove-editor-ingredient',
    template: require('./application-editor-ingredient.component.html'),
    styles: [require('./application-editor-ingredient.component.less')]
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
      if (this.ingredient.children) {
        return this.ingredient.children.length > 0;
      }
      return false;
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
