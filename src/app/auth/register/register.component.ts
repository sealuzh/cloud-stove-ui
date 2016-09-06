import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ControlGroup} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth';

@Component({
    template: require('./register.component.html'),
    styles: [require('./register.component.less')],
    providers: [AuthService],
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES],
})

export class RegisterComponent {

    registerForm;
    private register: {account_type?: string, email?: string, password?: string, password_confirm?: string} = {};

    constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {

        this.registerForm = this._fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])],
            'password': ['', Validators.required],
            'password_confirm': ['', Validators.required],
            'accept_agb': ['', Validators.required]
        }, {validator: this.matchingPasswords('password', 'password_confirm')});

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
            // this._auth.register(this.register.email, this.register.password).subscribe(
            //     result => {
            //         console.log(result);
            //         this._router.navigate(['login'], {queryParams: {'email': this.register.email}});
            //     },
            //     error => {
            //         console.log(error);
            //         // 409 already exists
            //         // 400 bad request
            //         // generic
            //     }
            // )

        }
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: ControlGroup) => {
            let passwordInput = group.controls[passwordKey];
            let passwordConfirmationInput = group.controls[confirmPasswordKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
        }
    }

}