import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {Recommendation} from '../dtos/recommendation.dto';

import {SumMonthlyPipe} from './sumMonthly.pipe';
import {SumHourlyPipe} from './sumHourly.pipe';

@Component({
    template: require('./recommendation-detail.component.html'),
    styles: [require('./recommendation-detail.component.scss')],
    directives: [ROUTER_DIRECTIVES],
    pipes: [SumMonthlyPipe, SumHourlyPipe]
})

export class RecommendationDetailComponent implements OnActivate {

    private applicationId: number;
    public recommendation: Recommendation;
    public recommendationNotFound: boolean;

    constructor(private _ingredientService: IngredientService) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = parseInt(curr.getParam('id'));
        this.applicationId = id;
        this.loadRecommendation(id);
    }

    loadRecommendation(id: number) {
        this._ingredientService.recommendation(id).subscribe(
            recommendation => {
              // no recommendation yet
              if (recommendation == null) {
                this.recommendationNotFound = true;
              } else {
                this.recommendation = recommendation;
              }
            },
            error => {
              this.recommendationNotFound = true;
              console.log(error);
            }
        );
    }

    triggerRecommendation() {
      this._ingredientService.triggerRecommendation(this.applicationId).subscribe(
        result => console.log(result),
        error => console.log(error)
      );
    }

}
