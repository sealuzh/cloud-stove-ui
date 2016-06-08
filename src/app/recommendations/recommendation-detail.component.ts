import {Component} from '@angular/core';
import {OnActivate, RouteSegment, Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    template: require('./recommendation-detail.component.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class RecommendationDetailComponent implements OnActivate {

    constructor(private router: Router) {

    }

    routerOnActivate(curr: RouteSegment): void {
        let id = curr.getParam('id');
        this.loadIngredient(id);
    }

    loadIngredient(id: string) {

    }

}
