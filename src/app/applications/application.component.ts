import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {ConstraintService} from '../services/constraint';
import {RecommendationService} from '../services/recommendation';
import {JobService} from '../services/job';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService, ConstraintService, RecommendationService, JobService]
})

export class ApplicationComponent {

    constructor() {

    }

}
