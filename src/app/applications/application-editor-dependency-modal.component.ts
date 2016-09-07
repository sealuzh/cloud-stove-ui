import {Component, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';

import {Ingredient} from '../dtos/ingredient.dto';
import {Constraint} from '../dtos/constraint.dto';

import {ConstraintService} from '../services/constraint';

import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    selector: 'cs-stove-editor-dependency-modal',
    template: require('./application-editor-dependency-modal.component.html'),
    styles: [require('./application-editor-dependency-modal.component.less')],
    directives: [
      MODAL_DIRECTIVES,
      DROPDOWN_DIRECTIVES
    ],
    viewProviders: [BS_VIEW_PROVIDERS]
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
        this._ref.markForCheck();
        this.modal.hide();
    }

    selectDependency(ingredient: Ingredient) {
        this.targetIngredient = ingredient;
    }

}
