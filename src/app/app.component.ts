import {Component, ViewContainerRef} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

// Services
import {ConfigService} from './services/configs';
import {RequestService} from './services/request';
import {SidebarComponent} from './sidebar/index';
import {IngredientService} from './services/ingredient';
import {ConstraintService} from './services/constraint';
import {JobService} from './services/job';
import {RecommendationService} from './services/recommendation';
import {RAMWorkloadService} from './services/ram-workload';
import {CPUWorkloadService} from './services/cpu-workload';
import {UserWorkloadService} from './services/user-workload';

import '../style/app.less';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'cs-app',
    template: require('./app.component.html'),
    styles: [require('./app.component.less')],
    directives: [ROUTER_DIRECTIVES, SidebarComponent],
    providers: [
      HTTP_PROVIDERS,
      ConfigService,
      RequestService,
      IngredientService,
      ConstraintService,
      RAMWorkloadService,
      CPUWorkloadService,
      UserWorkloadService,
      JobService,
      RecommendationService
    ]
})

export class AppComponent {

    viewContainerRef: any;

    constructor(viewContainerRef: ViewContainerRef) {
      this.viewContainerRef = viewContainerRef;
    }

}
