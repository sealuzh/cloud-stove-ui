import {Component, OnChanges, Input} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {Recommendation} from '../dtos/recommendation.dto';
import {LoadingComponent} from '../shared/loading.component';
import {SumMonthlyPipe} from './sumMonthly.pipe';
import {SumHourlyPipe} from './sumHourly.pipe';

@Component({
    selector: 'cs-recommendation-detail',
    template: require('./recommendation-detail.component.html'),
    styles: [require('./recommendation-detail.component.less')],
    directives: [ROUTER_DIRECTIVES, LoadingComponent],
    pipes: [SumMonthlyPipe, SumHourlyPipe]
})

export class RecommendationDetailComponent implements OnChanges {

    @Input()
    recommendation: Recommendation;

    constructor() {

    }

    ngOnChanges(changes: any): void {

    }

}
