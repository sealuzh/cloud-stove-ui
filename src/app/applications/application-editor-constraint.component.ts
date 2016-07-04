import {Component, Input} from '@angular/core';
import {Constraint} from '../dtos/constraint.dto';

@Component({
    selector: 'cs-stove-editor-dependency-constraint',
    template: require('./application-editor-constraint.component.html'),
    styles: [require('./application-editor-constraint.component.scss')],
    properties: ['constraint']
})

export class StoveEditorDependencyConstraintComponent {

    constraint: Constraint;

    constructor() {

    }

}
