import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {FormlyProviders} from 'ng2-formly';

// Services
import {ConfigService} from './services/configs';
import {RequestService} from './services/request';

import {SidebarComponent} from './sidebar/index';
import {WelcomeComponent} from './welcome/index';

// Components
import {ApplicationComponent} from './applications/application.component';
import {IngredientComponent} from './ingredients/ingredient.component';

import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'cs-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')],
    directives: [ROUTER_DIRECTIVES, SidebarComponent],
    providers: [HTTP_PROVIDERS, ConfigService, RequestService, FormlyProviders]
})

@Routes([

    // Application
    {path: 'applications', component: ApplicationComponent},

    // Ingredients
    {path: 'ingredients', component: IngredientComponent},

    // Welcome
    {path: '*', component: WelcomeComponent},

])

export class AppComponent {

    constructor(private router: Router) {

    }

}
