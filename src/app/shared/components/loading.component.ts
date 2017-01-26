/**
 * @module SharedModule
 */ /** */
 
import { Component, Input } from '@angular/core';

@Component({
    selector: 'cs-loading',
    styles: [require('./loading.component.less')],
    template: `
        <div class="loading text-center">
            <p>
                <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
            </p>
            <p class="message" *ngIf="message">
                {{ message }}
            </p>
        </div>
    `
})

export class LoadingComponent {

    @Input() message: string;

}
