import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {RecommendationService} from '../services/recommendation';
import {Recommendation} from '../dtos/recommendation.dto';

@Component({
    template: require('./recommendation-detail.component.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class RecommendationDetailComponent implements OnActivate {

    public recommendation: Recommendation;

    constructor(private _recommendationService: RecommendationService) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadRecommendation(id);
    }

    loadRecommendation(id: string) {

        // for now until API is up
        this.recommendation = {
            id: 1,
            application: { id: 2, name: 'Testlibestli' },
            recommendation: [
                {
                    ingredient: { id: 1, name: 'Test' },
                    resource: { id: 1, cores: 5, price_per_hour: 0.5, price_per_month: 30 }
                }
            ],
            vm_cost: 10,
            total_cost: 1000
        };
    }

}
