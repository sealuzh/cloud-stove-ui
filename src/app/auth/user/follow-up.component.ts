import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
@Component({
    template: require('./follow-up.component.html'),
    styles: [require('./follow-up.component.less')],
    directives: [ROUTER_DIRECTIVES],
})

export class FollowUpComponent {

    constructor() {
    }
}
