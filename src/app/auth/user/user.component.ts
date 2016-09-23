import {Component, ViewChild} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder} from '@angular/forms';
import {AuthService} from '../../services/auth';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    template: require('./user.component.html'),
    styles: [require('./user.component.less')],
    providers: [AuthService],
    directives: [REACTIVE_FORM_DIRECTIVES, ROUTER_DIRECTIVES, MODAL_DIRECTIVES, DROPDOWN_DIRECTIVES],
    viewProviders: [BS_VIEW_PROVIDERS]
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

    showDeleteAccountModal(){
        this.modal.show();
    }

    deleteAccount(){
        this.modal.hide();
        this._auth.deleteAccount().subscribe(
            result =>{
                let status = JSON.parse(result['_body']);
                if(status['status']==='success'){
                    this._router.navigateByUrl('/goodbye');
                }else{
                    alert('Something went wrong during account deletion. Please contact the administrators.');
                }
            },
            error => {
                alert('Something went wrong during account deletion. Please contact the administrators.');
            }
        )
    }
}
