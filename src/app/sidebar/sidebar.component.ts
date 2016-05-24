import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'cs-sidebar',
    template: require('./sidebar.component.html'),
    styles: [require('./sidebar.component.scss')],
    directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES],
})

export class SidebarComponent {

    constructor() {}

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

}
