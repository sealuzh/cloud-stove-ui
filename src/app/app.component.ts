import {Component, ViewContainerRef, OnInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES, Router } from '@angular/router';

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
import {AuthService} from './services/auth';

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
      RecommendationService,
      AuthService
    ]
})

export class AppComponent implements OnInit{

    viewContainerRef: any;
    authService: any;
    router: any;

    constructor(viewContainerRef: ViewContainerRef, authService: AuthService, router: Router) {
        this.viewContainerRef = viewContainerRef;
        this.authService = authService;
        this.router = router;
    }

    ngOnInit(): any {
        //check if token is still valid

        this.authService.validate().subscribe(
          result =>{
              this.router.navigateByUrl('/applications');
          },
          error => {
              this.router.navigateByUrl('/login');
          }
        );
        return undefined;
    }

}
