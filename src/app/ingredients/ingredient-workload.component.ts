import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { Ingredient } from '../api/dtos/ingredient.dto';

import { CPUWorkload } from '../api/dtos/workload/cpu-workload.dto';
import { RAMWorkload } from '../api/dtos/workload/ram-workload.dto';
import { ScalingWorkload } from '../api/dtos/workload/scaling-workload.dto';

import { CPUWorkloadService } from '../api/services/cpu-workload.service';
import { RAMWorkloadService } from '../api/services/ram-workload.service';
import { IngredientService } from '../api/services/ingredient.service';
import { ScalingWorkloadService } from '../api/services/scaling-workload.service';
import { UniversalValidators } from 'ng2-validators';

@Component({
    selector: 'cs-workload-form',
    template: require('./ingredient-workload.component.html')
})

export class IngredientWorkloadFormComponent implements OnInit, OnChanges {

    @Input()
    ingredient: Ingredient;

    @ViewChild('deleteModal') modal: any;

    cpuWorkload: CPUWorkload = {};
    ramWorkload: RAMWorkload = {};
    scalingWorkload: ScalingWorkload = {};

    cpuWorkloadForm;
    ramWorkloadForm;
    scalingWorkloadForm;

    constructor(
      private _fb: FormBuilder,
      private _cpuWorkloadService: CPUWorkloadService,
      private _ramWorkloadService: RAMWorkloadService,
      private _scalingWorkloadService: ScalingWorkloadService,
      private _ingredientService: IngredientService) {

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

    initScalingForm() {
      this.scalingWorkloadForm = this._fb.group({
        'scale_ingredient': [this.scalingWorkload.scale_ingredient, Validators.compose([Validators.required])]
      });

      this.scalingWorkloadForm.valueChanges
        .filter((value) => this.scalingWorkloadForm.valid)
        .subscribe((value) => {
          this.scalingWorkload['scale_ingredient'] = value['scale_ingredient'];
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

      if (this.ingredient.workloads && this.ingredient.workloads.scaling_workload) {
        this._scalingWorkloadService.get(this.ingredient.workloads.scaling_workload.id).subscribe((scalingWorkload) => {
          this.scalingWorkload = scalingWorkload;
          this.initScalingForm();
        }, (error) => console.error(error));
      } else {
        this.scalingWorkload = {};
      }
    }

    beforeSave() {
        this._ingredientService.findRecommendations(this.ingredient.id).subscribe(
            hasRecommendations => {
                if (hasRecommendations) {
                    this.modal.show();
                } else {
                    this.save();
                }
            },
            error => {
               console.log(error);
            }
        );
    }

    save() {
      if (this.ramWorkloadForm.valid && this.cpuWorkloadForm.valid && this.scalingWorkloadForm.valid) {
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

          this._scalingWorkloadService.save(this.scalingWorkload).subscribe((scalingWorkload) => {
              this.scalingWorkload = scalingWorkload;
              if (!this.ingredient.workloads) {
                  this.ingredient.workloads = {};
              }
              this.ingredient.workloads.scaling_workload = scalingWorkload;
          }, (error) => console.error(error));
      }
    }
}
