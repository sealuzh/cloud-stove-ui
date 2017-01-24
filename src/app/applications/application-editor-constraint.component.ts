/**
 * @module ApplicationsModule
 */ /** */

import {Component, ChangeDetectorRef, Input} from '@angular/core';
import {Constraint} from '../api/dtos/constraint.dto';

@Component({
    selector: 'cs-stove-editor-dependency-constraint',
    template: require('./application-editor-constraint.component.html'),
    styles: [require('./application-editor-constraint.component.less')]
})

export class StoveEditorDependencyConstraintComponent {

    @Input()
    constraint: Constraint;

    x1: number = 0;
    y1: number = 0;

    x2: number = 0;
    y2: number = 0;

    constructor(private _ref: ChangeDetectorRef) {

    }

    updateConstraint(x1, y1, x2, y2) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this._ref.detectChanges();
    }

}
