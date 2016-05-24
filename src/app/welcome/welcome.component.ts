import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'hb-welcome',
    template: require('./welcome.component.html'),
    styles: [require('./welcome.component.scss')],
})

export class WelcomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {

    }

}
