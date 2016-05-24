import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES, Routes, Router} from '@angular/router';
import {HTTP_PROVIDERS}    from '@angular/http';

// Services
import {CameraService} from './services/camera';
import {ConfigService} from './services/configs';

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
    providers: [HTTP_PROVIDERS, CameraService, ConfigService]
})

@Routes([
    {path: '/welcome', component: WelcomeComponent},
])

export class AppComponent implements OnInit {
    constructor(private router:Router) {
    }

    ngOnInit() {
        this.router.navigate(['/welcome']);
    }
}
