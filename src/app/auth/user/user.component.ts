import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    template: require('./user.component.html'),
    styles: [require('./user.component.less')]
})

export class UserComponent {

    error: any = null;
    @ViewChild('deleteAccountModal') modal: any;

    constructor(private _router: Router, private _fb: FormBuilder, private _auth: AuthService) {

    }

    getUserName(): string {
        return this._auth.getUser();
    }

    logout() {
        this._auth.logout();
        this._router.navigate(['/goodbye']);
    }

    showDeleteAccountModal() {
        this.modal.show();
    }

    deleteAccount() {
        this.modal.hide();
        this._auth.deleteAccount().subscribe(
            result => {
                let status = JSON.parse(result['_body']);
                if (status['status'] === 'success') {
                  this._router.navigateByUrl('/goodbye');
                } else {
                  alert('Something went wrong during account deletion. Please contact the administrators.');
                }
            },
            error => {
                alert('Something went wrong during account deletion. Please contact the administrators.');
            }
        );
    }
}
