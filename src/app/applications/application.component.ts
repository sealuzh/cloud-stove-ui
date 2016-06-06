import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, Router} from '@angular/router';
import {ApplicationService} from '../services/application';

import {ApplicationListComponent} from './application-list.component'
import {ApplicationDetailComponent} from './application-detail.component'

@Component({
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [ApplicationService]
})

@Routes([
    {path: '/:id', component: ApplicationDetailComponent},
    {path: '/', component: ApplicationListComponent}
])

export class ApplicationComponent {

    constructor(private router: Router) {

    }

}
