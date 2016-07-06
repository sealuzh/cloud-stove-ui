import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

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

import {DraggableDirective} from './editor/draggable.directive';
import {ConnectionDirective} from './editor/connection.directive';
import {PositionDirective} from './editor/position.directive';

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
      PositionDirective,
      DraggableDirective,
      LoadingComponent,
      ConnectionDirective,
      IngredientDetailComponent
    ],
    viewProviders: [BS_VIEW_PROVIDERS]
})

export class ApplicationEditorComponent implements OnActivate {

    application: Ingredient;
    activeIngredient: Ingredient;

    recommendations: Recommendation[] = [];

    applicationData: { 'nodes': any[], 'links': any[] } = { 'nodes': [], 'links': [] };

    status: { regionIsOpen: boolean, providerIsOpen: boolean } = { regionIsOpen: false, providerIsOpen: false };
    recommendation: { isGenerating: boolean } = { isGenerating: false };

    recommendationOptions: { region: string } = { region: 'EU' };

    regionConstraint: Constraint = { type: 'PreferredRegionAreaConstraint', preferred_region_area: null };
    providerConstraint: Constraint = { type: 'ProviderConstraint', preferred_providers: [] };

    selectableRegions: {id: string, name: string}[] = [
      {id: 'US', name: 'United States'},
      {id: 'EU', name: 'Europe'},
      {id: 'ASIA', name: 'Asia-Pacific'},
      {id: 'SA', name: 'South America'}
    ]
    selectableProviders: string[] = ['Google', 'Microsoft Azure', 'Digital Ocean', 'Atlantic.net', 'Amazon', 'Rackspace'];

    @ViewChild('lgModal') myModal: any;

    constructor(
      private _ingredientService: IngredientService,
      private _recommendationService: RecommendationService,
      private _constraintService: ConstraintService,
      private _ref: ChangeDetectorRef) {

    }

    openModal(event) {
      this.activeIngredient = event;
      this.myModal.show();
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadIngredient(parseInt(id, null));
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
                    console.log(error)
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

                let nodeMap: Map<number, number> = new Map<number, number>();

                // add nodes
                for (let ingredient of this.application.children) {
                    this.applicationData.nodes.push(ingredient);
                    nodeMap.set(ingredient.id, this.applicationData.nodes.indexOf(ingredient));
                }

                // add links/constraints
                this.addConstraintsToMap(application, nodeMap);

                this._ref.markForCheck();

            },
            error => console.log(error)
        );
    }

    addConstraintsToMap(ingredient: any, nodeMap: Map<number, number>) {
        if (ingredient.children) {
            for (let child of ingredient.children) {
                this.addConstraintsToMap(child, nodeMap);
                for (let constraint of child.constraints) {
                    if (constraint.type === 'DependencyConstraint') {
                        this.applicationData.links.push(
                            {
                                'source_id': constraint.source_id,
                                'target_id': constraint.target_id
                            }
                        );
                    }
                }
            }
        }
    }

    triggerRecommendation(application: Ingredient) {
      this.recommendation.isGenerating = true;
      this._recommendationService.loadRecommendation(application).subscribe(
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
      for (let child of this.application.children) {
        for (let rec of recommendation.recommendation) {
          if (rec.ingredient.id === child.id) {
            child.recommendation = rec.resource;
          }
        }
      }
    }


}
