/**
 * @module ApplicationsModule
 */ /** */

import {Component, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Ingredient} from '../../api/dtos/ingredient.dto';
import {Constraint} from '../../api/dtos/constraint.dto';
import {ConstraintService} from '../../api/services/constraint.service';

@Component({
    selector: 'cs-stove-editor-dependency-modal',
    template: require('./dependency-modal.component.html')
})

export class StoveEditorDependencyModalComponent {

    @Input()
    source: Ingredient;

    @Input()
    targets: Ingredient[];

    @ViewChild('lgModal') modal: any;

    @Output()
    add: any = new EventEmitter();

    targetIngredient: Ingredient;

    status: { dependencyIsOpen: boolean } = { dependencyIsOpen: false };
    constraint: { isGenerating: boolean } = { isGenerating: false };

    constructor(private _constraintService: ConstraintService, private _ref: ChangeDetectorRef) {

    }

    show() {
      this.modal.show();
    }

    addConstraint() {
      let constraint: Constraint = {
        ingredient_id: this.source.id,
        target_id: this.targetIngredient.id,
        source_id: this.source.id,
        type: 'DependencyConstraint'
      };

      this._constraintService.save(constraint).subscribe(
        con => this.addedDependency(con),
        error => console.log(error)
      );
    }

    private addedDependency(constraint: Constraint) {
      this.source.constraints.push(constraint);
      this.add.emit(constraint);
      this.modal.hide();
    }

    selectDependency(ingredient: Ingredient) {
      this.targetIngredient = ingredient;
    }

}
