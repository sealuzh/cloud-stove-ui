import {Component, OnInit, Input} from '@angular/core';
import {ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';

import {RecommendationService} from '../services/recommendation';
import {Recommendation} from '../dtos/recommendation.dto';
import {Ingredient} from '../dtos/ingredient.dto';

import {LoadingComponent} from '../shared/loading.component';

@Component({
    template: require('./recommendation-detail.component.html'),
    styles: [require('./recommendation-detail.component.less')],
    directives: [ROUTER_DIRECTIVES, LoadingComponent]
})

export class RecommendationDetailComponent implements OnInit {

    @Input()
    application: Ingredient;

    public recommendation: Recommendation[];

    constructor(private _recommendationService: RecommendationService, private _route: ActivatedRoute) {

    }

    ngOnInit(): void {
      this._route.params.subscribe(params => {
        let recommendationId = +params['id'];
        //this._recommendationService.get(recommendationId).subscribe(result => this.recommendation = result, error => console.error(error));
      });
    }

}
