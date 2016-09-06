import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

import {AuthService} from '../services/auth';


@Component({
    selector: 'cs-sidebar',
    template: require('./sidebar.component.html'),
    styles: [require('./sidebar.component.less')],
    directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [AuthService]
})

export class SidebarComponent {


    constructor( private _auth: AuthService) {}

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    isUserLoggedIn():boolean {
        return this._auth.isLoggedIn();
    }



}
