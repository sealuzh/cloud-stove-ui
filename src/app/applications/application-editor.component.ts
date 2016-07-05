import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {RecommendationService} from '../services/recommendation';

import {Ingredient} from '../dtos/ingredient.dto';

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
    applicationData: { 'nodes': any[], 'links': any[] } = { 'nodes': [], 'links': [] };

    status: { isOpen: boolean } = { isOpen: false };
    recommendation: { isGenerating: boolean } = { isGenerating: false };

    recommendationOptions: { region: string } = { region: 'EU' };

    constructor(private _ingredientService: IngredientService, private _recommendationService: RecommendationService) {

    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadIngredient(parseInt(id, null));
    }

    changeRegion(region: string) {
      this.recommendationOptions.region = region;
    }

    loadIngredient(id: number) {
        this._ingredientService.get(id, null).subscribe(
            application => {
                this.application = application;

                let nodeMap: Map<number, number> = new Map<number, number>();

                // add nodes
                for (let ingredient of this.application.children) {
                    this.applicationData.nodes.push(ingredient);
                    nodeMap.set(ingredient.id, this.applicationData.nodes.indexOf(ingredient));
                }

                // add links/constraints
                this.addConstraintsToMap(application, nodeMap);

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
          this.applyRecommendation(result);
          this.recommendation.isGenerating = false;
        },
        error => {
          console.log(error);
          this.recommendation.isGenerating = false;
        }
      );
    }

    applyRecommendation(result: any) {
      for (let child of this.application.children) {
        for (let recommendation of result.recommendation) {
          if (recommendation.ingredient.id === child.id) {
            child.recommendation = recommendation.resource;
          }
        }
      }
    }

}
