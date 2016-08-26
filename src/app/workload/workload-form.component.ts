import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Workload} from '../dtos/workload.dto';
import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';

@Component({
    selector: 'cs-workload-form',
    template: `
      <form [formGroup]="workloadForm">
        <div class="form-group">
            <label class="form-control-label">Minimum RAM:</label>
            <input class="form-control" type="text" formControlName="ram_mb_required" [ngModel]="internalWorkload.ram_mb_required">
        </div>
        <div class="form-group">
            <label class="form-control-label">RAM Growth per User:</label>
            <input class="form-control" type="text" formControlName="ram_mb_growth_per_user">
        </div>
        <div class="form-group">
            <label class="form-control-label">User Capacity for 1 CPU:</label>
            <input class="form-control" type="text" formControlName="cspu_user_capacity">
        </div>
        <div class="form-group">
            <label class="form-control-label">Parallelism:</label>
            <input class="form-control" type="text" formControlName="cspu_slope">
        </div>
        <div class="form-group">
            <label class="form-control-label">Visits per Month</label>
            <input class="form-control" type="text" formControlName="visits_per_month">
        </div>
        <div class="form-group">
            <label class="form-control-label">Requests per Visit:</label>
            <input class="form-control" type="text" formControlName="requests_per_vists">
        </div>
        <div class="form-group">
            <label class="form-control-label">Request Size (kb):</label>
            <input class="form-control" type="text" formControlName="request_size_kb">
        </div>
      </form>
    `,
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class WorkloadFormComponent {

    @Input()
    workload: Workload;
    internalWorkload: Workload = {};

    @Output()
    removed: any = new EventEmitter();

    workloadForm;

    constructor(private _fb: FormBuilder) {

        this.workloadForm = this._fb.group({
            'ram_mb_required': ['', Validators.compose([Validators.required])],
            'ram_mb_growth_per_user': ['', Validators.compose([Validators.required])],
            'cspu_user_capacity': ['', Validators.compose([Validators.required])],
            'cspu_slope': ['', Validators.compose([Validators.required])],
            'visits_per_month': ['', Validators.compose([Validators.required])],
            'requests_per_vists': ['', Validators.compose([Validators.required])],
            'request_size_kb': ['', Validators.compose([Validators.required])]
        });

        this.workloadForm.valueChanges
          .filter((value) => this.workloadForm.valid)
          .subscribe((value) => {
             this.workload['ram_mb_required'] = +value['ram_mb_required'];
             this.workload['ram_mb_growth_per_user'] = +value['ram_mb_growth_per_user'];
             this.workload['cspu_user_capacity'] = +value['cspu_user_capacity'];
             this.workload['cspu_slope'] = 1 / +value['cspu_slope'];
             this.workload['visits_per_month'] = +value['visits_per_month'];
             this.workload['requests_per_vists'] = +value['requests_per_vists'];
             this.workload['request_size_kb'] = +value['request_size_kb'];
          });

    }

}
