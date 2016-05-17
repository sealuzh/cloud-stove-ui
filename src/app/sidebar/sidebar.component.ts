import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'cs-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css'],
    directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES],
})

export class SidebarComponent {

    public toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

}
