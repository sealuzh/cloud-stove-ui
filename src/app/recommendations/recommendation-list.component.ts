import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    template: require('./recommendation-list.component.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class RecommendationListComponent implements OnActivate {

    constructor() {

    }

    routerOnActivate(curr: RouteSegment): void {

    }

    loadApplications() {

    }

}
