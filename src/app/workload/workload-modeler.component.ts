import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {RatingComponent} from 'ng2-bootstrap';
import {Nouislider} from 'ng2-nouislider';
import {WorkloadFormComponent} from './workload-form.component';
import {Workload} from '../dtos/workload.dto';

@Component({
    selector: 'cs-workload-modeler',
    template: require('./workload-modeler.component.html'),
    directives: [RatingComponent, Nouislider, WorkloadFormComponent, CORE_DIRECTIVES, FORM_DIRECTIVES],
    styles: [require('./workload-modeler.component.scss')],
})

export class WorkloadModelerComponent {

    public sliderConfig: any = {
      connect: 'lower',
      pips: {
        mode: 'steps',
        density: 10
      }
    };

    public userSliderconfig: any = {
      connect: 'lower',
    };

    public cpuCategories: string[] = ['1-2', '2-4', '4-8', '8-32', '32+'];
    public ramCategories: string[] = ['>512', '>1024', '>4096', '>16384', '>65536'];

    public cpu_step: number = 2;
    public ram_step: number = 3;
    public user_step: number = 1;

    public workload: Workload;

    constructor() {
      this.workload = {};
    }

}
