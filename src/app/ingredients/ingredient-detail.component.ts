import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Location} from '@angular/common';

import {Ingredient} from '../dtos/ingredient.dto';
import {Constraint} from '../dtos/constraint.dto';

import {IngredientService} from '../services/ingredient';
import {ConstraintService} from '../services/constraint';

import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';

import {CpuConstraintFormComponent} from '../forms/cpu-constraint.component';
import {RamConstraintFormComponent} from '../forms/ram-constraint.component';
import {RegionConstraintFormComponent} from '../forms/region-constraint.component';

import {PropertyPipe} from '../shared/property.pipe';

import {Observable} from 'rxjs/Rx';

import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {WorkloadFormComponent} from '../forms/workload.component';

@Component({
    selector: 'cs-ingredient-detail',
    template: require('./ingredient-detail.component.html'),
    styles: [require('./ingredient-detail.component.scss')],
    directives: [
      REACTIVE_FORM_DIRECTIVES,
      DROPDOWN_DIRECTIVES,
      CpuConstraintFormComponent,
      RamConstraintFormComponent,
      RegionConstraintFormComponent,
      WorkloadFormComponent
    ],
    pipes: [PropertyPipe]
})

export class IngredientDetailComponent {

    public constraintDropdown: { isOpen: boolean } = { isOpen: false };
    public constraintFilter: { type: string }[] = [
      {type: 'CpuConstraint'},
      {type: 'RamConstraint'},
      {type: 'PreferredRegionAreaConstraint'}
    ];

    public ingredientForm;

    @Input()
    ingredient: Ingredient;

    @Output() ingredientChange: any = new EventEmitter(); updateData(event) {
      this.ingredient = event;
      this.ingredientChange.emit(event);
    }

    constructor(
      private _ingredientService: IngredientService,
      private _constraintService: ConstraintService,
      private _location: Location,
      private _fb: FormBuilder) {

        this.ingredientForm = this._fb.group({
            'name': ['', Validators.required],
            'body': ['']
        });

        this.ingredientForm.valueChanges
          .filter((value) => this.ingredientForm.valid)
          .subscribe((value) => {
             Object.assign(this.ingredient, value);
          });

    }

    submit(ingredientObj: Ingredient) {
        let updates = [];

        for (let constraint of ingredientObj.constraints) {
          updates.push(this._constraintService.save(constraint));
        }

        updates.push(this._ingredientService.save(ingredientObj));

        if (updates.length > 0) {
          Observable.forkJoin(updates).subscribe(result => {
            this.updateData(ingredientObj);
          });
        } else {
          this.updateData(ingredientObj);
        }

    }

    addConstraint(constraintType: string) {
      let constraint: Constraint = {
        ingredient_id: this.ingredient.id,
        type: constraintType
      };

      this._constraintService.save(constraint).subscribe(
        con => this.ingredient.constraints.push(con),
        error => console.log(error)
      );
    }

    removeConstraint(constraint: Constraint) {
      this._constraintService.delete(constraint).subscribe(
        success => this.ingredient.constraints.splice(this.ingredient.constraints.indexOf(constraint), 1),
        error => console.log(error)
      );
    }

}
