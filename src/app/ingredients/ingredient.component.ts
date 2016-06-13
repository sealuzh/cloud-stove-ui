import {IngredientListComponent} from './ingredient-list.component';
import {IngredientDetailComponent} from './ingredient-detail.component';

import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {IngredientService} from '../services/ingredient';
import {ConstraintService} from '../services/constraint';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService, ConstraintService]
})

@Routes([
    {path: '/:id', component: IngredientDetailComponent},
    {path: '/', component: IngredientListComponent}
])

export class IngredientComponent {

    constructor(private router: Router) {

    }

}
