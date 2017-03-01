/**
 * @module ApplicationsModule
 */ /** */
 
import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'cs-stove-editor-confirm-modal',
    template: require('./confirm-modal.component.html')
})

export class StoveEditorConfirmModalComponent {

    @ViewChild('modal') modal: any;

    text: String;
    confirmCb: Function;

    constructor() {

    }

    show(text: String, cb: Function) {
        this.text = text;
        this.confirmCb = cb;
        this.modal.show();
    }


}
