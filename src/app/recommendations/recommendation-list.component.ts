import {Component} from '@angular/core';
import {Router, OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {RecommendationService} from '../services/recommendation';
import {Recommendation} from '../dtos/recommendation.dto';

@Component({
    template: require('./recommendation-list.component.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class RecommendationListComponent implements OnActivate {

    public recommendations: Recommendation[];
    public status: { isGenerating: boolean } = { isGenerating: false };

    constructor(private _router: Router, private _recommendationService: RecommendationService) {

    }

    routerOnActivate(curr: RouteSegment): void {
        this.loadRecommendations();
    }

    loadRecommendations() {
      /*
      this.status.isGenerating = true;
      this._recommendationService.loadRecommendation(application).subscribe(
        result => {
          this.recommendations.push(result);
          this.status.isGenerating = false;
        },
        error => {
          console.log(error);
          this.status.isGenerating = false;
        }
      );
      */
    }

    goToRecommendation(id: number) {
        this._router.navigate(['/recommendations', id]);
    }

}
