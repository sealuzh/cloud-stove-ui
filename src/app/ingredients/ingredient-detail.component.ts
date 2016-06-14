import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {Ingredient} from '../dtos/ingredient.dto';
import {Constraint} from '../dtos/constraint.dto';

import {IngredientService} from '../services/ingredient';
import {ConstraintService} from '../services/constraint';

import {FormlyConfig, FormlyForm, FormlyMessages, FormlyBootstrap, TemplateDirectives} from 'ng2-formly';
import {IngredientForm} from '../forms/ingredient.form';

import {CPUConstraintForm} from '../forms/cpu-constraint.form';
import {RamConstraintForm} from '../forms/ram-constraint.form';

import {PropertyPipe} from '../shared/property.pipe';

import {Observable} from 'rxjs/Rx';

import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    template: require('./ingredient-detail.component.html'),
    styles: [require('./ingredient-detail.component.scss')],
    directives: [ROUTER_DIRECTIVES, FormlyForm, DROPDOWN_DIRECTIVES],
    providers: [FormlyConfig, FormlyMessages, FormlyBootstrap],
    pipes: [PropertyPipe]
})

export class IngredientDetailComponent implements OnActivate {

    public constraintDropdown: { isOpen: boolean } = { isOpen: false };
    public constraintFilter: any[] = [{type: 'CpuConstraint'}, {type: 'RamConstraint'}];

    public ingredient: Ingredient;
    public ingredientFields;

    constructor(fm: FormlyMessages, fc: FormlyConfig,
      private _ingredientService: IngredientService,
      private _constraintService: ConstraintService,
      private _location: Location) {

        fm.addStringMessage('required', 'This field is required.');
        fm.addStringMessage('maxlength', 'Maximum Length Exceeded.');
        fm.addStringMessage('minlength', 'Should have atleast 2 Characters');

        ['input', 'checkbox', 'textarea'].forEach((field) => {
            fc.setType({
                name: field,
                component: TemplateDirectives[field]
            });
        });

        this.ingredientFields = IngredientForm.ingredientFields();

    }

    submit(ingredientObj: Ingredient) {
        let constraintUpdates = [];

        for (let constraint of ingredientObj.constraints) {
          delete constraint.fields;
          constraintUpdates.push(this._constraintService.save(constraint));
        }

        if (constraintUpdates.length > 0) {
          Observable.forkJoin(constraintUpdates).subscribe(result => {
            this.updateIngredient(ingredientObj);
          });
        } else {
          this.updateIngredient(ingredientObj);
        }

    }

    goBack() {
      this._location.back();
    }

    updateIngredient(ingredientObj: Ingredient) {
      this._ingredientService.save(ingredientObj).subscribe(
          ingredient => {
            this.populateConstraintFields(ingredient.constraints);
            this.ingredient = ingredient;
          },
          error => console.log(error)
      );
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadIngredient(parseInt(id, null));
    }

    loadIngredient(id: number) {
        this._ingredientService.get(id, null).subscribe(
            ingredient => {
              this.populateConstraintFields(ingredient.constraints);
              this.ingredient = ingredient;
            },
            error => console.log(error)
        );
    }

    addConstraint(constraintType: string) {
      let constraint: Constraint = {
        ingredient_id: this.ingredient.id,
        type: constraintType
      };

      this._constraintService.save(constraint).subscribe(
        constraint => {
          this.ingredient.constraints.push(constraint);
          this.populateConstraintFields(this.ingredient.constraints);
        },
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

    // todo: refactor this
    private populateConstraintFields(constraints: Constraint[]) {
      for (let constraint of constraints) {
        switch (constraint.type) {
          case 'CpuConstraint':
            constraint.fields = CPUConstraintForm.constraintFields();
            break;
          case 'RamConstraint':
            constraint.fields = RamConstraintForm.constraintFields();
            break;
        }
      }
    }

}
