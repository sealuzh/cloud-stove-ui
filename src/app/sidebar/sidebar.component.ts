import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'cs-sidebar',
    template: require('./sidebar.component.html'),
    styles: [require('./sidebar.component.less')]
})

export class SidebarComponent {

    constructor(private _auth: AuthService) {}

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    isUserLoggedIn(): boolean {
        return this._auth.tokenPresent();
    }

    getEmailAddress(): string {
        return this._auth.getUser();
    }

}
