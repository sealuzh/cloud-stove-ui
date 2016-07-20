import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {IngredientService} from '../services/ingredient';

import {TemplateListComponent} from './template-list.component';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService]
})

export class TemplateComponent {

    constructor() {

    }

}
