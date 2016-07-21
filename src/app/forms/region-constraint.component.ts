import {Component, Input, Output, EventEmitter} from '@angular/core';

import {Constraint} from '../dtos/constraint.dto';
import {ConstraintService} from '../services/constraint';

import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'cs-region-constraint-form',
    template: `
      <form [formGroup]="constraintForm">
        <button class="btn btn-xs btn-warning btn-remove-constraint" (click)="removeConstraint(constraint)"><i class="fa fa-remove"></i></button>
        <div class="form-group">
            <label class="form-control-label">Region:</label>
            <select class="form-control" formControlName="preferred_region_area" [ngModel]="constraint.preferred_region_area">
              <option *ngFor="let region of regions" [value]='region.value' >{{region.label}}</option>
            </select>
        </div>
      </form>
    `,
    directives: [REACTIVE_FORM_DIRECTIVES],
    providers: [ConstraintService]
})

export class RegionConstraintFormComponent {

    @Input()
    constraint: Constraint;

    @Output()
    removed: any = new EventEmitter();

    constraintForm;

    regions: any[] = [{
      label: 'Europe',
      value: 'EU'
    }, {
      label: 'United States',
      value: 'US'
    }, {
      label: 'Asia-Pacific',
      value: 'ASIA'
    }, {
      label: 'South America',
      value: 'SA'
    }];

    constructor(private _fb: FormBuilder, private _constraintService: ConstraintService) {

        this.constraintForm = this._fb.group({
            'preferred_region_area': [Validators.required],
        });

        this.constraintForm.valueChanges
          .filter((value) => this.constraintForm.valid)
          .subscribe((value) => {
             Object.assign(this.constraint, value);
          });

    }

    removeConstraint(constraint: Constraint) {
      this.removed.emit(constraint);
    }

}
