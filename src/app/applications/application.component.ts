import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {ConstraintService} from '../services/constraint';
import {RecommendationService} from '../services/recommendation';
import {JobService} from '../services/job';

import {ApplicationListComponent} from './application-list.component';
import {ApplicationEditorComponent} from './application-editor.component';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService, ConstraintService, RecommendationService, JobService]
})

@Routes([
    {path: '/:id/editor', component: ApplicationEditorComponent},
    {path: '/', component: ApplicationListComponent}
])

export class ApplicationComponent {

    constructor(private router: Router) {

    }

}
