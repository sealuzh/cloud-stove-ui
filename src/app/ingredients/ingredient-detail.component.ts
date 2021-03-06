/**
 * @module IngredientsModule
 */ /** */
 
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
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

export class IngredientDetailComponent implements OnChanges {

    public constraintDropdown: { isOpen: boolean } = { isOpen: false };
    public constraintFilter: { type: string }[] = [
      {type: 'CpuConstraint'},
      {type: 'RamConstraint'},
      {type: 'PreferredRegionAreaConstraint'}
    ];

    public ingredientForm;

    @Input()
    ingredient: Ingredient;

    @Output()
    delete = new EventEmitter();

    @Output()
    removeConstraint = new EventEmitter();

    @Output()
    update = new EventEmitter();

    @ViewChild('workloadForm') workloadForm: IngredientWorkloadFormComponent;

    constructor(
      private _ingredientService: IngredientService,
      private _constraintService: ConstraintService,
      private _location: Location,
      private _changeDetector: ChangeDetectorRef,
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

    ngOnChanges(changes: any): void {
      if (changes.ingredient) {
        this.ingredientForm.markAsPristine();
      }
    }

    submit(ingredientObj: Ingredient) {
      this.workloadForm.beforeSave();
      this._ingredientService.save(ingredientObj).subscribe(result => {
        this.update.emit(result);
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

    deleteIngredient(ingredientObj: Ingredient) {
      this._ingredientService.delete(ingredientObj).subscribe(result => {
        this.delete.emit(ingredientObj);
      }, error => console.error(error));
    }

}
