import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';

import {Ingredient} from '../dtos/ingredient.dto';
import {UserWorkloadService} from '../services/user-workload';
import {UserWorkload} from '../dtos/workload/user-workload.dto';

import {UniversalValidators} from 'ng2-validators';
import {Nouislider} from 'ng2-nouislider';

@Component({
    selector: 'cs-user-workload-slider',
    styles: [require('./user-workload.component.less')],
    template: `
      <form [formGroup]="userWorkloadForm" class="form-inline form-user-workload">
        <input type="hidden" formControlName="ingredient_id" [ngModel]="ingredient.id">
        <nouislider formControlName="num_simultaneous_users" [connect]="lower" [min]="0" [max]="50000" [step]="50" [(ngModel)]="userWorkload.num_simultaneous_users"></nouislider>
        <div class="text-center">
          {{ userWorkload.num_simultaneous_users }} concurrent users
        </div>
      </form>
    `,
    directives: [REACTIVE_FORM_DIRECTIVES, Nouislider]
})

export class UserWorkloadSliderComponent implements OnInit, OnChanges {

    @Input()
    ingredient: Ingredient;

    userWorkload: UserWorkload = {num_simultaneous_users: 100}; // default
    userWorkloadForm;

    constructor(private _fb: FormBuilder, private _userWorkloadService: UserWorkloadService) {

      this.userWorkloadForm = this._fb.group({
          'num_simultaneous_users': ['', Validators.compose([Validators.required, UniversalValidators.isNumber])],
          'ingredient_id': ['', Validators.compose([Validators.required, UniversalValidators.isNumber])],
      });

      this.userWorkloadForm.valueChanges
        .filter((value) => this.userWorkloadForm.valid)
        .debounceTime(500)
        .subscribe((value) => {
           this._userWorkloadService.save(this.userWorkload).subscribe((cpuWorkload) => { }, (error) => console.error(error));
        });

    }

    ngOnInit(): void {
      this.loadWorkload();
    }

    ngOnChanges(changes: any): void {
      if (changes.ingredient) {
        this.userWorkload['ingredient_id'] = changes.ingredient.id;
        this.loadWorkload();
      }
    }

    private loadWorkload() {
      if (this.ingredient.workloads && this.ingredient.workloads.user_workload) {
        this._userWorkloadService.get(this.ingredient.workloads.user_workload.id).subscribe((userWorkload) => this.userWorkload = userWorkload, (error) => console.error(error));
      }
    }

}
