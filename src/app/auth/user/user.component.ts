import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth';

@Component({
    template: require('./user.component.html'),
    styles: [require('./user.component.less')],
    providers: [AuthService],
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES],
})

export class UserComponent {

    error: any = null;

    constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {
    }

    getUserName(): string {
        return this._auth.getUser();
    }

    logout() {
        this._auth.logout();
        this._router.navigate(['/']);
    }
}
