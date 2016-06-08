import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {ApplicationService} from '../services/application';
import {IngredientService} from '../services/ingredient';

import {RecommendationListComponent} from './recommendation-list.component';
import {RecommendationDetailComponent} from './recommendation-detail.component';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [ApplicationService, IngredientService]
})

@Routes([
    { path: '/:id', component: RecommendationDetailComponent },
    { path: '/', component: RecommendationListComponent }
])

export class RecommendationComponent {

    constructor(private router: Router) {

    }

}
