import {Component, ViewContainerRef} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

// Services
import {ConfigService} from './services/configs';
import {RequestService} from './services/request';
import {SidebarComponent} from './sidebar/index';
import {IngredientService} from './services/ingredient';
import {ConstraintService} from './services/constraint';
import {RAMWorkloadService} from './services/ram-workload';
import {CPUWorkloadService} from './services/cpu-workload'; 

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
    providers: [
      HTTP_PROVIDERS,
      ConfigService,
      RequestService,
      IngredientService,
      ConstraintService,
      RAMWorkloadService,
      CPUWorkloadService
    ]
})

export class AppComponent {

    viewContainerRef: any;

    constructor(viewContainerRef: ViewContainerRef) {
      this.viewContainerRef = viewContainerRef;
    }

}
