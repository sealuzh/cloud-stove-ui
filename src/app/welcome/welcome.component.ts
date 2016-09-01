import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'cs-welcome',
    template: require('./welcome.component.html'),
    styles: [require('./welcome.component.less')],
})

export class WelcomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {

    }

}
