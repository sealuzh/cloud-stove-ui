import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {IngredientService} from '../services/ingredient';
import {ConstraintService} from '../services/constraint';

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [IngredientService, ConstraintService]
})

export class IngredientComponent {

    constructor() {

    }

}
