import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {IngredientService} from '../services/ingredient';
import {RecommendationService} from '../services/recommendation';
import {ResourceService} from '../services/resource';

import {RecommendationListComponent} from './recommendation-list.component';
import {RecommendationDetailComponent} from './recommendation-detail.component';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService, RecommendationService, ResourceService]
})

@Routes([
    { path: '/:id', component: RecommendationDetailComponent },
    { path: '/', component: RecommendationListComponent }
])

export class RecommendationComponent {

    constructor(private router: Router) {

    }

}
