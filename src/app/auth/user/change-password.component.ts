import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {ControlGroup} from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth';

@Component({
    template: require('./change-password.component.html'),
    styles: [require('./change-password.component.less')],
    providers: [AuthService],
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES],
})

export class ChangePasswordComponent {

    changePasswordForm;
    error: any = null;
    success: any = null;
    errorMessage: string;
    successMessage: string;

    private change: {password?: string, password_confirm?: string} = {};

    constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {

        this.changePasswordForm = this._fb.group({
            'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            'password_confirm': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        }, {validator: this.matchingPasswords('password', 'password_confirm')});

        this.changePasswordForm.valueChanges
            .filter((value) => this.changePasswordForm.valid)
            .subscribe((value) => {
                this.change.password = value.password;
                this.change.password_confirm = value.password_confirm;
            });

    }

    submit(changePasswordForm): void {
        console.log(changePasswordForm.valid);
        if (changePasswordForm.valid) {


            this._auth.changePassword(this.change.password, this.change.password_confirm).subscribe(
                result => {
                    //TODO: save user
                    this.successMessage = 'Password changed successfully!';
                    this.success = true;
                    // this._router.navigateByUrl('/applications');
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