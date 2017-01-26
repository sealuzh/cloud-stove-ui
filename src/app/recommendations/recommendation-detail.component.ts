/**
 * @module RecommendationsModule
 */ /** */
 
import {Component, OnChanges, Input} from '@angular/core';
import {Recommendation} from '../api/dtos/recommendation.dto';

@Component({
    selector: 'cs-recommendation-detail',
    template: require('./recommendation-detail.component.html'),
    styles: [require('./recommendation-detail.component.less')]
})

export class RecommendationDetailComponent implements OnChanges {

    @Input()
    recommendation: Recommendation;

    constructor() {

    }

    ngOnChanges(changes: any): void {

    }

}
