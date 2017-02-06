/**
 * @module IngredientsModule
 */ /** */
 
import { Component, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { Ingredient } from '../api/dtos/ingredient.dto';
import { Constraint } from '../api/dtos/constraint.dto';

import { IngredientService } from '../api/services/ingredient.service';
import { ConstraintService } from '../api/services/constraint.service';

import { IngredientWorkloadFormComponent } from './ingredient-workload.component';

import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'cs-ingredient-detail',
    template: require('./ingredient-detail.component.html'),
    styles: [require('./ingredient-detail.component.less')]
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

    @ViewChild('workloadForm') workloadForm: IngredientWorkloadFormComponent;

    constructor(
      private _ingredientService: IngredientService,
      private _constraintService: ConstraintService,
      private _location: Location,
      private _fb: FormBuilder) {

        this.ingredientForm = this._fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'body': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            'icon': ['']
        });

        this.ingredientForm.valueChanges
          .filter((value) => this.ingredientForm.valid)
          .debounceTime(500)
          .subscribe((value) => {
            this.ingredient.name = value.name;
            this.ingredient.body = value.body;
            this.ingredient.icon = value.icon;
          });

    }

    submit(ingredientObj: Ingredient) {
      this.workloadForm.beforeSave();
      this._ingredientService.save(ingredientObj).subscribe(result => {
        this.ingredient.name = result.name;
        this.ingredient.body = result.body;
        this.ingredient.icon = result.icon;
      }, error => console.error(error));
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
