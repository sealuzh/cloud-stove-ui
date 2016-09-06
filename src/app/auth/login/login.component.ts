import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth';

@Component({
    template: require('./login.component.html'),
    styles: [require('./login.component.less')],
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [AuthService]
})

export class LoginComponent implements OnInit {

    loginForm;
    login: {email?: string, password?: string} = {};
    error: any = null;

    constructor(private _router: Router, private _fb: FormBuilder, private _authService: AuthService, private _activatedRoute: ActivatedRoute) {

        this.loginForm = this._fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        });

        this.loginForm.valueChanges
            .filter((value) => this.loginForm.valid)
            .subscribe((value) => {
                this.error = null;
                this.login['email'] = value['email'];
                this.login['password'] = value['password'];
            });


    }

    ngOnInit() {
        // TODO: RC5 moves this to QueryParams
        this._router.routerState.queryParams.subscribe(queryParams => {
            this.login['email'] = queryParams['email'];
        });
    }

    loginAction() {
        console.log(this.loginForm.valid);
        if (this.loginForm.valid) {
            this._authService.login(this.login.email, this.login.password).subscribe(
                result => {
                    //TODO: save user
                    this._router.navigateByUrl('/applications');
                },
                error => {
                    this.error = true;
                }

            );
        }
    }

}