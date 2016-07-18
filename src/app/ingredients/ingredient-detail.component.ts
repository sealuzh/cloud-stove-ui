import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Location} from '@angular/common';

import {Ingredient} from '../dtos/ingredient.dto';
import {Constraint} from '../dtos/constraint.dto';

import {IngredientService} from '../services/ingredient';
import {ConstraintService} from '../services/constraint';

import {FormlyConfig, FormlyForm, FormlyMessages, FormlyBootstrap, TemplateDirectives} from 'ng2-formly';
import {IngredientForm} from '../forms/ingredient.form';

import {CPUConstraintForm} from '../forms/cpu-constraint.form';
import {RamConstraintForm} from '../forms/ram-constraint.form';
import {RegionConstraintForm} from '../forms/region-constraint.form';

import {PropertyPipe} from '../shared/property.pipe';

import {Observable} from 'rxjs/Rx';

import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    selector: 'cs-ingredient-detail',
    template: require('./ingredient-detail.component.html'),
    styles: [require('./ingredient-detail.component.scss')],
    directives: [FormlyForm, DROPDOWN_DIRECTIVES],
    providers: [FormlyConfig, FormlyMessages, FormlyBootstrap],
    pipes: [PropertyPipe]
})

export class IngredientDetailComponent {

    public constraintDropdown: { isOpen: boolean } = { isOpen: false };
    public constraintFilter: { type: string }[] = [
      {type: 'CpuConstraint'},
      {type: 'RamConstraint'},
      {type: 'PreferredRegionAreaConstraint'}
    ];

    public ingredientFields;
    public constraintFields;

    @Input()
    ingredient: Ingredient;

    @Output() ingredientChange: any = new EventEmitter(); updateData(event) {
      this.ingredient = event;
      this.ingredientChange.emit(event);
    }

    constructor(fm: FormlyMessages, fc: FormlyConfig,
      private _ingredientService: IngredientService,
      private _constraintService: ConstraintService,
      private _location: Location) {

        fm.addStringMessage('required', 'This field is required.');
        fm.addStringMessage('maxlength', 'Maximum Length Exceeded.');
        fm.addStringMessage('minlength', 'Should have atleast 2 Characters');

        ['input', 'checkbox', 'textarea', 'select', 'multicheckbox'].forEach((field) => {
            fc.setType({
                name: field,
                component: TemplateDirectives[field]
            });
        });

        this.ingredientFields = IngredientForm.ingredientFields();
        this.constraintFields = {
          'CpuConstraint': CPUConstraintForm.constraintFields(),
          'RamConstraint': RamConstraintForm.constraintFields(),
          'PreferredRegionAreaConstraint': RegionConstraintForm.constraintFields()
        };

    }

    submit(ingredientObj: Ingredient) {
        let constraintUpdates = [];

        for (let constraint of ingredientObj.constraints) {
          constraintUpdates.push(this._constraintService.save(constraint));
        }

        if (constraintUpdates.length > 0) {
          Observable.forkJoin(constraintUpdates).subscribe(result => {
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
        success => {
          this.ingredient.constraints.splice(this.ingredient.constraints.indexOf(constraint), 1);
        },
        error => console.log(error)
      );
    }

}
