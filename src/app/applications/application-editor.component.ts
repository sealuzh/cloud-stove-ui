import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {NgSwitch, NgSwitchWhen} from '@angular/common';

import {IngredientService} from '../services/ingredient';
import {RecommendationService} from '../services/recommendation';
import {ConstraintService} from '../services/constraint';

import {Ingredient} from '../dtos/ingredient.dto';
import {Constraint} from '../dtos/constraint.dto';
import {Recommendation} from '../dtos/recommendation.dto';

import {LoadingComponent} from '../shared/loading.component';

import {IngredientDetailComponent} from '../ingredients/ingredient-detail.component';
import {StoveEditorIngredientComponent} from './application-editor-ingredient.component';
import {StoveEditorDependencyConstraintComponent} from './application-editor-constraint.component';
import {StoveEditorDependencyModalComponent} from './application-editor-dependency-modal.component';

import {DraggableDirective} from './editor/draggable.directive';
import {ConnectionDirective} from './editor/connection.directive';
import {PositionDirective} from './editor/position.directive';

import {PropertyPipe} from '../shared/property.pipe';

import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    template: require('./application-editor.component.html'),
    styles: [require('./application-editor.component.scss')],
    directives: [
      ROUTER_DIRECTIVES,
      MODAL_DIRECTVES,
      DROPDOWN_DIRECTIVES,
      StoveEditorIngredientComponent,
      StoveEditorDependencyConstraintComponent,
      StoveEditorDependencyModalComponent,
      PositionDirective,
      DraggableDirective,
      LoadingComponent,
      ConnectionDirective,
      NgSwitch,
      NgSwitchWhen,
      IngredientDetailComponent
    ],
    viewProviders: [BS_VIEW_PROVIDERS],
    pipes: [PropertyPipe]
})

export class ApplicationEditorComponent implements OnActivate {

    application: Ingredient;
    activeIngredient: Ingredient;

    recommendations: Recommendation[] = [];

    status: { regionIsOpen: boolean, providerIsOpen: boolean } = { regionIsOpen: false, providerIsOpen: false };
    recommendation: { isGenerating: boolean, activeRecommendation: Recommendation } = { isGenerating: false, activeRecommendation: null };

    recommendationOptions: { region: string } = { region: 'EU' };

    regionConstraint: Constraint = { type: 'PreferredRegionAreaConstraint', preferred_region_area: null };
    providerConstraint: Constraint = { type: 'ProviderConstraint', preferred_providers: [] };

    editorMode: { type: String } = { type: 'editor' };

    selectableRegions: {id: string, name: string}[] = [
      {id: 'US', name: 'United States'},
      {id: 'EU', name: 'Europe'},
      {id: 'ASIA', name: 'Asia-Pacific'},
      {id: 'SA', name: 'South America'}
    ];

    selectableProviders: string[] = ['Google', 'Microsoft Azure', 'Digital Ocean', 'Atlantic.net', 'Amazon', 'Rackspace'];

    @ViewChild(StoveEditorDependencyModalComponent) stoveEditorDependencyModalComponent: StoveEditorDependencyModalComponent;

    constructor(
      private _ingredientService: IngredientService,
      private _recommendationService: RecommendationService,
      private _constraintService: ConstraintService,
      private _ref: ChangeDetectorRef) {

    }

    openModal(event) {
      this.selectIngredient(event);
      this.stoveEditorDependencyModalComponent.show();
    }

    selectIngredient(event) {
      this.activeIngredient = event;
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadIngredient(parseInt(id, null));
    }

    changeEditorMode(type: string) {
      this.editorMode.type = type;
    }

    changeRegion(region: string) {
        this.regionConstraint.ingredient_id = this.application.id;
        this.regionConstraint.preferred_region_area = region;
        this._constraintService.save(this.regionConstraint).subscribe(
          result => this.regionConstraint = result,
          error => console.log(error)
        );
    }

    selectProvider(provider: string) {
      this.providerConstraint.ingredient_id = this.application.id;

      if (this.providerConstraint.preferred_providers.indexOf(provider) > -1) {
        this.providerConstraint.preferred_providers.splice(this.providerConstraint.preferred_providers.indexOf(provider), 1);
      } else {
        this.providerConstraint.preferred_providers.push(provider);
      }

      this._constraintService.save(this.providerConstraint).subscribe(
        result => this.providerConstraint = result,
        error => console.log(error)
      );
    }

    stringAsDate(date: string) {
      return new Date(date);
    }

    loadIngredient(id: number) {
        this._ingredientService.get(id, null).subscribe(
            application => {
                this.application = application;

                // fetch recommendations
                this._ingredientService.recommendations(this.application.id).subscribe(
                  result => {
                    this.recommendations = result;
                  },
                  error => {
                    console.log(error);
                  }
                );

                // get application constraints
                for (let constraint of this.application.constraints) {
                  if (constraint.type === 'PreferredRegionAreaConstraint') {
                    this.regionConstraint = constraint;
                  }

                  if (constraint.type === 'ProviderConstraint') {
                    this.providerConstraint = constraint;
                  }
                }

                this._ref.markForCheck();

            },
            error => console.log(error)
        );
    }

    extractConstraints(ingredient: Ingredient): any[] {
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

    triggerRecommendation(application: Ingredient) {
      this.recommendation.isGenerating = true;
      this._recommendationService.get(application.id).subscribe(
        result => {
          this.recommendations = result.reverse();
          this.recommendation.isGenerating = false;
        },
        error => {
          console.log(error);
          this.recommendation.isGenerating = false;
        }
      );
    }

    applyRecommendation(recommendation: Recommendation) {
      this.recommendation.activeRecommendation = recommendation;

      for (let child of this.application.children) {
        for (let rec of recommendation.recommendation) {
          if (rec.ingredient.id === child.id) {
            child.recommendation = rec.resource;
            child.recommendation.avg_vm_cost = recommendation.vm_cost / this.application.children.length;
          }
        }
      }
    }


}
