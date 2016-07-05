import {Component} from '@angular/core';
import {Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {RecommendationService} from '../services/recommendation';
import {ResourceService} from '../services/resource';

import {Recommendation} from '../dtos/recommendation.dto';
import {Resource} from '../dtos/resource.dto';

@Component({
    template: require('./recommendation-list.component.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class RecommendationListComponent implements OnActivate {

    public recommendations: Recommendation[];

    constructor(private _router: Router, private _recommendationService: RecommendationService) {

    }

    routerOnActivate(curr: RouteSegment): void {
        this.loadRecommendations();
    }

    loadRecommendations() {
      /*
        this._recommendationService.query(null).subscribe(
            recommendations => this.recommendations = recommendations,
            error => console.log(error)
        );
      */
    }

    goToRecommendation(id: number) {
        this._router.navigate(['/recommendations', id]);
    }

}
