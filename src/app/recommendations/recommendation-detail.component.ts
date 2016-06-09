import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {Recommendation} from '../dtos/recommendation.dto';

import {SumMonthlyPipe} from './sumMonthly.pipe';
import {SumHourlyPipe} from './sumHourly.pipe';

@Component({
    template: require('./recommendation-detail.component.html'),
    directives: [ROUTER_DIRECTIVES],
    pipes: [SumMonthlyPipe, SumHourlyPipe]
})

export class RecommendationDetailComponent implements OnActivate {

    public recommendation: Recommendation;
    public recommendationNotFound: boolean;

    constructor(private _ingredientService: IngredientService) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadRecommendation(parseInt(id));
    }

    loadRecommendation(id: number) {
        this._ingredientService.recommendation(id).subscribe(
            recommendation => this.recommendation = recommendation,
            error => {
              this.recommendationNotFound = true;
              console.log(error);
            }
        );
    }

}
