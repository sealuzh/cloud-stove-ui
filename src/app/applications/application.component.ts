import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {IngredientService} from '../services/ingredient';
import {ConstraintService} from '../services/constraint';

import {ApplicationListComponent} from './application-list.component';
import {ApplicationDetailComponent} from './application-detail.component';
import {ApplicationEditorComponent} from './application-editor.component';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService, ConstraintService]
})

@Routes([
    {path: '/:id/editor', component: ApplicationEditorComponent},
    {path: '/:id/detail', component: ApplicationDetailComponent},
    {path: '/', component: ApplicationListComponent}
])

export class ApplicationComponent {

    constructor(private router: Router) {

    }

}
