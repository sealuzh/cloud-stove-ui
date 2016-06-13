import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {IngredientService} from '../services/ingredient';

import {TemplateListComponent} from './template-list.component';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService]
})

@Routes([
    {path: '/', component: TemplateListComponent}
])

export class TemplateComponent {

    constructor(private router: Router) {

    }

}
