/**
 * @module WelcomeModule
 */ /** */
 
import { Component } from '@angular/core';

@Component({
    template: require('./welcome.component.html'),
    styles: [require('./welcome.component.less')],
})

export class WelcomeComponent {

    constructor() {

    }

}
