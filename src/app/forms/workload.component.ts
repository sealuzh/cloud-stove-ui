import {Component, Input, OnInit, OnChanges, ViewChild} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';

import {Ingredient} from '../dtos/ingredient.dto';

import {CPUWorkloadService} from '../services/cpu-workload';
import {RAMWorkloadService} from '../services/ram-workload';

import {CPUWorkload} from '../dtos/workload/cpu-workload.dto';
import {RAMWorkload} from '../dtos/workload/ram-workload.dto';

import {UniversalValidators} from 'ng2-validators';

import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';


@Component({
    selector: 'cs-workload-form',
    template: require('./workload.component.html'),
    directives: [
        REACTIVE_FORM_DIRECTIVES,
        MODAL_DIRECTIVES,
        DROPDOWN_DIRECTIVES
    ],
    viewProviders: [BS_VIEW_PROVIDERS]
})

export class WorkloadFormComponent implements OnInit, OnChanges {

    @Input()
    ingredient: Ingredient;

    @ViewChild('deleteModal') modal: any;


    cpuWorkload: CPUWorkload = {};
    ramWorkload: RAMWorkload = {};

    cpuWorkloadForm;
    ramWorkloadForm;

    constructor(private _fb: FormBuilder, private _cpuWorkloadService: CPUWorkloadService, private _ramWorkloadService: RAMWorkloadService) {

    }

    ngOnInit(): void {
      this.loadWorkloads();
    }

    ngOnChanges(changes: any): void {
      if (changes.ingredient) {
        this.loadWorkloads();
      }
    }

    initCPUForm() {
      this.cpuWorkloadForm = this._fb.group({
          'cspu_user_capacity': [this.cpuWorkload.cspu_user_capacity, Validators.compose([Validators.required, UniversalValidators.isNumber])],
          'parallelism': [this.cpuWorkload.parallelism, Validators.compose([Validators.required, UniversalValidators.isNumber])]
      });

      this.cpuWorkloadForm.valueChanges
        .filter((value) => this.cpuWorkloadForm.valid)
        .subscribe((value) => {
           this.cpuWorkload['cspu_user_capacity'] = +value['cspu_user_capacity'];
           this.cpuWorkload['parallelism'] = +value['parallelism'];
           this.cpuWorkload['ingredient_id'] = this.ingredient.id;
        });
    }

    initRAMForm() {
      this.ramWorkloadForm = this._fb.group({
          'ram_mb_required': [this.ramWorkload.ram_mb_required, Validators.compose([Validators.required, UniversalValidators.isNumber])],
          'ram_mb_growth_per_user': [this.ramWorkload.ram_mb_growth_per_user, Validators.compose([Validators.required, UniversalValidators.isNumber])],
          'ram_mb_required_user_capacity': [this.ramWorkload.ram_mb_required_user_capacity, Validators.compose([Validators.required, UniversalValidators.isNumber])]
      });

      this.ramWorkloadForm.valueChanges
        .filter((value) => this.ramWorkloadForm.valid)
        .subscribe((value) => {
           this.ramWorkload['ram_mb_required'] = +value['ram_mb_required'];
           this.ramWorkload['ram_mb_growth_per_user'] = +value['ram_mb_growth_per_user'];
           this.ramWorkload['ram_mb_required_user_capacity'] = +value['ram_mb_required_user_capacity'];
           this.ramWorkload['ingredient_id'] = this.ingredient.id;
        });
    }

    private loadWorkloads() {
      if (this.ingredient.workloads && this.ingredient.workloads.cpu_workload) {
        this._cpuWorkloadService.get(this.ingredient.workloads.cpu_workload.id).subscribe((cpuWorkload) => {
          this.cpuWorkload = cpuWorkload;
          this.initCPUForm();
        }, (error) => console.error(error));
      } else {
        this.cpuWorkload = {};
      }

      if (this.ingredient.workloads && this.ingredient.workloads.ram_workload) {
        this._ramWorkloadService.get(this.ingredient.workloads.ram_workload.id).subscribe((ramWorkload) => {
          this.ramWorkload = ramWorkload;
          this.initRAMForm();
        }, (error) => console.error(error));
      } else {
        this.ramWorkload = {};
      }
    }

    beforeSave() {
        this.modal.show();
    }

    save() {
      this.modal.hide();
      this._cpuWorkloadService.save(this.cpuWorkload).subscribe((cpuWorkload) => {
        this.cpuWorkload = cpuWorkload;
        if (!this.ingredient.workloads) {
          this.ingredient.workloads = {};
        }
        this.ingredient.workloads.cpu_workload = cpuWorkload;
      }, (error) => console.error(error));

      this._ramWorkloadService.save(this.ramWorkload).subscribe((ramWorkload) => {
        this.ramWorkload = ramWorkload;
        if (!this.ingredient.workloads) {
          this.ingredient.workloads = {};
        }
        this.ingredient.workloads.ram_workload = ramWorkload;
      }, (error) => console.error(error));
    }

}
