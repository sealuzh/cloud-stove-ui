import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {IngredientService} from '../services/ingredient';
import {RecommendationService} from '../services/recommendation';
import {ResourceService} from '../services/resource';
import {JobService} from '../services/job';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService, RecommendationService, ResourceService, JobService]
})

export class RecommendationComponent {

    constructor() {

    }

}
