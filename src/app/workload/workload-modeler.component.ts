import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {RatingComponent} from 'ng2-bootstrap';
import {Nouislider} from 'ng2-nouislider';

@Component({
    selector: 'cs-workload-modeler',
    template: require('./workload-modeler.component.html'),
    directives: [RatingComponent, Nouislider, CORE_DIRECTIVES, FORM_DIRECTIVES],
    styles: [require('./workload-modeler.component.scss')],
})

export class WorkloadModelerComponent {

    public sliderConfig: any = {
      pips: {
        mode: 'steps',
        density: 10
      }
    };

    public cpu: number[] = [1, 2, 4, 8, 16, 32, 64, 96];
    public ram: number[] = [512, 1024, 2048, 4096, 8192, 16384, 32768, 65536];

    public cpu_step: number = 5;
    public ram_step: number = 5;

    public cpu_hover: number = null;
    public ram_hover: number = null;

    constructor() {

    }

    public hoverCPU(value: number) {
      this.cpu_hover = value;
    }

    public resetCPU() {
      this.cpu_hover = null;
    }

    public hoverRAM(value: number) {
      this.ram_hover = value;
    }

    public resetRAM() {
      this.ram_hover = null;
    }

}
