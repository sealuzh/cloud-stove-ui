import {Component, ViewContainerRef} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_DIRECTIVES} from '@angular/router';

// Services
import {ConfigService} from './services/configs';
import {RequestService} from './services/request';

import {SidebarComponent} from './sidebar/index';
import {WelcomeComponent} from './welcome/index';

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
    providers: [HTTP_PROVIDERS, ConfigService, RequestService]
})

export class AppComponent {

    viewContainerRef: any;

    constructor(viewContainerRef: ViewContainerRef) {
      this.viewContainerRef = viewContainerRef;
    }

}
