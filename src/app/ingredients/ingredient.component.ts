import {IngredientListComponent} from './ingredient-list.component';
import {IngredientDetailComponent} from './ingredient-detail.component';

import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {IngredientService} from '../services/ingredient';

@Component({
    template: `<h1>Ingredients</h1><router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService]
})

@Routes([
    {path: '/:id', component: IngredientDetailComponent},
    {path: '/', component: IngredientListComponent}
])

export class IngredientComponent {

    constructor(private router: Router) {

    }

}
