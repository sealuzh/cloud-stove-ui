import {Component, ViewChild, ChangeDetectorRef, OnInit} from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {RecommendationService} from '../services/recommendation';
import {ConstraintService} from '../services/constraint';
import {JobService} from '../services/job';

import {Ingredient} from '../dtos/ingredient.dto';
import {Constraint} from '../dtos/constraint.dto';

import {LoadingComponent} from '../shared/loading.component';

import {IngredientDetailComponent} from '../ingredients/ingredient-detail.component';
import {StoveEditorIngredientComponent} from './application-editor-ingredient.component';
import {StoveEditorDependencyConstraintComponent} from './application-editor-constraint.component';
import {StoveEditorDependencyModalComponent} from './application-editor-dependency-modal.component';

import {DraggableDirective} from './editor/draggable.directive';
import {ConnectionDirective} from './editor/connection.directive';
import {PositionDirective} from './editor/position.directive';

import {PropertyPipe} from '../shared/property.pipe';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

import {IngredientConstraintsComponent} from './../ingredients/ingredient-constraints.component';
import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';


@Component({
    template: require('./application-editor.component.html'),
    styles: [require('./application-editor.component.less')],
    directives: [
      ROUTER_DIRECTIVES,
      MODAL_DIRECTIVES,
      DROPDOWN_DIRECTIVES,
      StoveEditorIngredientComponent,
      StoveEditorDependencyConstraintComponent,
      StoveEditorDependencyModalComponent,
      PositionDirective,
      DraggableDirective,
      LoadingComponent,
      ConnectionDirective,
      IngredientDetailComponent,
      IngredientConstraintsComponent,
      REACTIVE_FORM_DIRECTIVES
    ],
    viewProviders: [BS_VIEW_PROVIDERS],
    pipes: [PropertyPipe],
    providers: [IngredientService, RecommendationService, ConstraintService, JobService]
})

export class ApplicationEditorComponent implements OnInit {

    application: Ingredient;
    editor: { parent?: Ingredient, application?: Ingredient, ingredient?: Ingredient, dependencies?: Constraint[] } = {};

    @ViewChild(StoveEditorDependencyModalComponent) stoveEditorDependencyModalComponent: StoveEditorDependencyModalComponent;

    @ViewChild('changeAppNameModal') modal: any;

    changeNameForm;
    changeName: {appName?: string} = {};

    constructor(
      private _ingredientService: IngredientService,
      private _constraintService: ConstraintService,
      private _ref: ChangeDetectorRef,
      private _route: ActivatedRoute,
      private _fb : FormBuilder) {

        this.changeNameForm = this._fb.group({
            'appName': ['', Validators.compose([Validators.required])],
        });

        this.changeNameForm.valueChanges
            .filter((value) => this.changeNameForm.valid)
            .subscribe((value) => {
                this.changeName['appName'] = value['appName'];
            });

    }

    ngOnInit(): void {
        this._route.params.subscribe(params => {
          let id = +params['id'];
          this.loadIngredient(id);
        });
    }

    openModal(ingredient) {
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

    openAppNameModal(){
        this.modal.show();
    }

    changeAppName(){
        this.modal.hide();
        this.application.name = this.changeName.appName;
        this._ingredientService.save(this.application).subscribe(result => {
            this.application = result;
        }, error => console.error(error));
    }

    private extractConstraints(ingredient: Ingredient): Constraint[] {
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

}
