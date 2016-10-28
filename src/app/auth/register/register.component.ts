import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PasswordMatcher } from '../validators/matcher.validator';

@Component({
    template: require('./register.component.html'),
    styles: [require('./register.component.less')]
})

export class RegisterComponent {

    registerForm;
    error: any = null;
    errorMessage: string;

    private register: {account_type?: string, email?: string, password?: string, password_confirm?: string} = {};

    constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {

        this.registerForm = this._fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'password_confirm': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        }, {validator: PasswordMatcher.matchingPasswords});

        this.registerForm.valueChanges
            .filter((value) => this.registerForm.valid)
            .subscribe((value) => {
                this.register.email = value.email;
                this.register.password = value.password;
            });

    }

    submit(registerForm): void {
        console.log(registerForm.valid);
        if (registerForm.valid) {
            this._auth.register(this.register.email, this.register.password, this.register.password_confirm).subscribe(
                result => {
                    // TODO: Navigate to first ingredient, without using the ingredient service in here!
                },
                error => {
                    let errorType = error['_body'].constructor.name;
                    if (errorType === 'String') {
                        let errors = JSON.parse(error['_body']);
                        if (errors.hasOwnProperty('errors')) {
                            this.errorMessage = errors['errors']['full_messages'][0];
                        }
                    } else {
                        this.errorMessage = 'Something went wrong. Check your Internet connection!';
                    }

                    this.error = true;
                }
            );
        }
    }

}
