import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Constraint} from '../dtos/constraint.dto';
import {ConstraintService} from '../services/constraint';

import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'cs-ram-constraint-form',
    template: `
      <form [formGroup]="constraintForm">
        <button class="btn btn-xs btn-warning btn-remove-constraint" (click)="removeConstraint(constraint)"><i class="fa fa-remove"></i></button>
        <div class="form-group">
            <label class="form-control-label">Minimum RAM:</label>
            <input class="form-control" type="text" formControlName="min_ram" [ngModel]="constraint.min_ram" disabled>
        </div>
      </form>
    `,
    directives: [REACTIVE_FORM_DIRECTIVES],
    providers: [ConstraintService]
})

export class RamConstraintFormComponent {

    @Input()
    constraint: Constraint;

    @Output()
    removed: any = new EventEmitter();

    constraintForm;

    constructor(private _fb: FormBuilder, private _constraintService: ConstraintService) {

        this.constraintForm = this._fb.group({
            'min_ram': ['', Validators.compose([Validators.required, , Validators.pattern('^[0-9]+$')])]
        });

        this.constraintForm.valueChanges
          .filter((value) => this.constraintForm.valid)
          .subscribe((value) => {
             this.constraint['min_ram'] = +value['min_ram'];
          });

    }

    removeConstraint(constraint: Constraint) {
      this.removed.emit(constraint);
    }

}
