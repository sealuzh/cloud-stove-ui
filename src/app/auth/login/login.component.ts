/**
 * @module AuthModule
 */ /** */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    template: require('./login.component.html'),
    styles: [require('./login.component.less')]
})

export class LoginComponent implements OnInit {

    loginForm;
    login: {email?: string, password?: string} = {};
    error: any = null;
    errormessage: string;

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
        this._activatedRoute.queryParams.subscribe(queryParams => {
            this.login['email'] = queryParams['email'];
        });
    }

    loginAction() {
        console.log(this.loginForm.valid);
        if (this.loginForm.valid) {
            this._authService.login(this.login.email, this.login.password).subscribe(
                result => {
                    this._router.navigateByUrl('/applications');
                },
                error => {
                    let errorType = error['_body'].constructor.name;
                    if (errorType === 'String') {
                        let errors = JSON.parse(error['_body']);
                        if (errors.hasOwnProperty('errors')) {
                            this.errormessage = 'Please check your E-Mail and password.';
                        }
                    } else {
                        this.errormessage = 'Something went wrong. Check your Internet connection!';
                    }

                    this.error = true;
                }
            );
        }
    }

}
