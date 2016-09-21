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
    error: any = null;
    errorMessage: string;

    private register: {account_type?: string, email?: string, password?: string, password_confirm?: string} = {};

    constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {

        this.registerForm = this._fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'password_confirm': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
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
            this._auth.register(this.register.email, this.register.password, this.register.password_confirm).subscribe(
                result => {
                    //TODO: save user
                    this._router.navigateByUrl('/applications');
                },
                error => {
                    let errorType = error['_body'].constructor.name;
                    if(errorType === 'String'){
                        let errors = JSON.parse(error['_body']);
                        if(errors.hasOwnProperty('errors')){
                            this.errorMessage = errors['errors']['full_messages'][0];
                        }
                    }else{
                        this.errorMessage = 'Something went wrong. Check your Internet connection!';
                    }

                    this.error = true;
                }
            );
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