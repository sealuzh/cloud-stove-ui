import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';

import {Ingredient} from '../dtos/ingredient.dto';

import {CPUWorkloadService} from '../services/cpu-workload';
import {RAMWorkloadService} from '../services/ram-workload';

import {CPUWorkload} from '../dtos/workload/cpu-workload.dto';
import {RAMWorkload} from '../dtos/workload/ram-workload.dto';

import {UniversalValidators} from 'ng2-validators';

@Component({
    selector: 'cs-workload-form',
    template: `
      <form [formGroup]="ramWorkloadForm">
        <div class="form-group">
            <label class="form-control-label">Minimum RAM:</label>
            <input class="form-control" type="text" formControlName="ram_mb_required" [ngModel]="ramWorkload.ram_mb_required">
        </div>
        <div class="form-group">
            <label class="form-control-label">User Capacity for Minimum RAM:</label>
            <input class="form-control" type="text" formControlName="ram_mb_required_user_capacity" [ngModel]="ramWorkload.ram_mb_required_user_capacity">
        </div>
        <div class="form-group">
            <label class="form-control-label">RAM Growth per User:</label>
            <input class="form-control" type="text" formControlName="ram_mb_growth_per_user" [ngModel]="ramWorkload.ram_mb_growth_per_user">
        </div>
      </form>
      <form [formGroup]="cpuWorkloadForm">
        <div class="form-group">
            <label class="form-control-label">User Capacity for 1 CPU:</label>
            <input class="form-control" type="text" formControlName="cspu_user_capacity" [ngModel]="cpuWorkload.cspu_user_capacity">
        </div>
        <div class="form-group">
            <label class="form-control-label">Parallelism:</label>
            <input class="form-control" type="text" formControlName="parallelism" [ngModel]="cpuWorkload.parallelism">
        </div>
      </form>
    `,
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class WorkloadFormComponent implements OnInit, OnChanges {

    @Input()
    ingredient: Ingredient;

    cpuWorkload: CPUWorkload = {};
    ramWorkload: RAMWorkload = {};

    cpuWorkloadForm;
    ramWorkloadForm;

    constructor(private _fb: FormBuilder, private _cpuWorkloadService: CPUWorkloadService, private _ramWorkloadService: RAMWorkloadService) {

        this.cpuWorkloadForm = this._fb.group({
            'cspu_user_capacity': ['', Validators.compose([Validators.required, UniversalValidators.isNumber])],
            'parallelism': ['', Validators.compose([Validators.required, UniversalValidators.isNumber])]
        });

        this.ramWorkloadForm = this._fb.group({
            'ram_mb_required': ['', Validators.compose([Validators.required, UniversalValidators.isNumber])],
            'ram_mb_growth_per_user': ['', Validators.compose([Validators.required, UniversalValidators.isNumber])],
            'ram_mb_required_user_capacity': ['', Validators.compose([Validators.required, UniversalValidators.isNumber])]
        });

        this.cpuWorkloadForm.valueChanges
          .filter((value) => this.cpuWorkloadForm.valid)
          .debounceTime(500)
          .subscribe((value) => {
             this.cpuWorkload['cspu_user_capacity'] = +value['cspu_user_capacity'];
             this.cpuWorkload['parallelism'] = +value['parallelism'];
             this.cpuWorkload['ingredient_id'] = this.ingredient.id;
             this._cpuWorkloadService.save(this.cpuWorkload).subscribe((cpuWorkload) => this.cpuWorkload = cpuWorkload, (error) => console.error(error));
          });

        this.ramWorkloadForm.valueChanges
          .filter((value) => this.ramWorkloadForm.valid)
          .debounceTime(500)
          .subscribe((value) => {
             this.ramWorkload['ram_mb_required'] = +value['ram_mb_required'];
             this.ramWorkload['ram_mb_growth_per_user'] = +value['ram_mb_growth_per_user'];
             this.ramWorkload['ram_mb_required_user_capacity'] = +value['ram_mb_required_user_capacity'];
             this.ramWorkload['ingredient_id'] = this.ingredient.id;
             this._ramWorkloadService.save(this.ramWorkload).subscribe((ramWorkload) => this.ramWorkload = ramWorkload, (error) => console.error(error));
          });

    }

    ngOnInit(): void {
      this.loadWorkloads();
    }

    ngOnChanges(changes: any): void {
      if (changes.ingredient) {
        this.loadWorkloads();
      }
    }

    private loadWorkloads() {
      if (this.ingredient.workloads && this.ingredient.workloads.cpu_workload) {
        this._cpuWorkloadService.get(this.ingredient.workloads.cpu_workload.id).subscribe((cpuWorkload) => this.cpuWorkload = cpuWorkload, (error) => console.error(error));
      } else {
        this.cpuWorkload = {};
      }

      if (this.ingredient.workloads && this.ingredient.workloads.ram_workload) {
        this._ramWorkloadService.get(this.ingredient.workloads.ram_workload.id).subscribe((ramWorkload) => this.ramWorkload = ramWorkload, (error) => console.error(error));
      } else {
        this.ramWorkload = {};
      }
    }

}
