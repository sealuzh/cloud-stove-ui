/**
 * @module ApplicationsModule
 */ /** */

import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientService } from '../api/services/ingredient.service';
import { ConstraintService } from '../api/services/constraint.service';
import { Ingredient } from '../api/dtos/ingredient.dto';
import { Constraint } from '../api/dtos/constraint.dto';
import { StoveEditorDependencyModalComponent } from './modals/dependency-modal.component';
import { StoveEditorNameModalComponent } from './modals/name-modal.component';
import { StoveEditorConfirmModalComponent } from './modals/confirm-modal.component';

@Component({
    template: require('./application-editor.component.html'),
    styles: [require('./application-editor.component.less')],
})

export class ApplicationEditorComponent implements AfterViewInit {

    application: Ingredient;
    editor: { parent?: Ingredient, application?: Ingredient, ingredient?: Ingredient, dependencies?: Constraint[] } = {};

    @ViewChild(StoveEditorDependencyModalComponent) stoveEditorDependencyModalComponent: StoveEditorDependencyModalComponent;
    @ViewChild(StoveEditorNameModalComponent) stoveEditorNameModalComponent: StoveEditorNameModalComponent;
    @ViewChild(StoveEditorConfirmModalComponent) stoveEditorConfirmModalComponent: StoveEditorConfirmModalComponent;

    constructor(
      private _ingredientService: IngredientService,
      private _constraintService: ConstraintService,
      private _ref: ChangeDetectorRef,
      private _route: ActivatedRoute) {

    }

    ngAfterViewInit(): void {
        this._route.params.subscribe(params => {
            this.loadIngredient(+params['id']);
        });
    }

    openDependencyModal(ingredient) {
      this.selectIngredient(ingredient);
      this.stoveEditorDependencyModalComponent.show();
    }

    selectIngredient(ingredient) {
      this.editor.ingredient = ingredient;
    }

    zoomIn() {
      this.zoomTo(this.editor.ingredient);
    }

    zoomOut() {
      if (this.editor.parent) {
        this.zoomTo(this.editor.parent);
        return;
      }
    }

    zoomTo(ingredient: Ingredient) {
      this.editor.parent = this.editor.application;
      this.editor.application = ingredient;
      this.editor.ingredient = this.editor.application.children[0]; // select first as default
      this.editor.dependencies = this.extractConstraints(this.editor.application);
      this._ref.detectChanges();
    }

    loadIngredient(id: number) {
        this._ingredientService.get(id, null).subscribe(
            application => {
                this.application = application;
                this.zoomTo(this.application);
            },
            error => console.log(error)
        );
    }

    addIngredient() {
        this.application.children.push({name: 'New Ingredient ', parent_id: this.application.id, body: 'Add a description of this ingredient.'});
    }

    deleteIngredient(ingredient) {
        this.application.children.splice(this.application.children.indexOf(ingredient), 1);
        this.zoomTo(this.application);
    }

    updateIngredient(ingredient) {
        let ingredientIndex = this.editor.application.children.indexOf(this.editor.ingredient);
        Object.assign(this.editor.application.children[ingredientIndex], ingredient);
        this.selectIngredient(ingredient);
    }

    extractConstraints(ingredient: Ingredient): Constraint[] {
      let links = [];

      if (ingredient.children) {
          for (let child of ingredient.children) {
              links.push(this.extractConstraints(child));
              for (let constraint of child.constraints) {
                  if (constraint.type === 'DependencyConstraint') {
                      links.push(constraint);
                  }
              }
          }
      }

      return links;
    }

    onConstraintAdd(constraint: Constraint) {
      this.editor.dependencies.push(constraint);
    }

    onConstraintRemove(constraint: Constraint) {
        this.stoveEditorConfirmModalComponent.show('Would you like to remove this dependency?', () => {
            this._constraintService.delete(constraint).subscribe(
            success => {
                this.editor.dependencies.splice(this.editor.dependencies.indexOf(constraint), 1);
            }, error => console.error(error));
        });
    }

}
