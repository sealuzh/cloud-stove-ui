import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from '@angular/forms';
import {Nouislider} from 'ng2-nouislider';

import {Ingredient} from '../dtos/ingredient.dto';
import {UserWorkloadService} from '../services/user-workload';
import {UserWorkload} from '../dtos/workload/user-workload.dto';

import {UniversalValidators} from 'ng2-validators';

@Component({
    selector: 'cs-user-workload-slider',
    styles: [require('./user-workload.component.scss')],
    template: `
      <form [formGroup]="userWorkloadForm" class="form-inline form-user-workload">
        <input class="form-control" type="text" formControlName="num_simultaneous_users" [ngModel]="userWorkload.num_simultaneous_users">
        <span> Users</span>
      </form>
    `,
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class UserWorkloadSliderComponent implements OnInit, OnChanges {

    @Input()
    ingredient: Ingredient;

    userWorkload: UserWorkload = {num_simultaneous_users: 100}; // default

    userWorkloadForm;

    constructor(private _fb: FormBuilder, private _userWorkloadService: UserWorkloadService) {

      this.userWorkloadForm = this._fb.group({
          'num_simultaneous_users': ['', Validators.compose([Validators.required, UniversalValidators.isNumber])],
      });

      this.userWorkloadForm.valueChanges
        .filter((value) => this.userWorkloadForm.valid)
        .debounceTime(500)
        .subscribe((value) => {
           this.userWorkload['num_simultaneous_users'] = +value['num_simultaneous_users'];
           this.userWorkload['ingredient_id'] = this.ingredient.id;
           this._userWorkloadService.save(this.userWorkload).subscribe((cpuWorkload) => this.userWorkload = cpuWorkload, (error) => console.error(error));
        });

    }

    ngOnInit(): void {
      this.loadWorkload();
    }

    ngOnChanges(changes: any): void {
      if (changes.ingredient) {
        this.loadWorkload();
      }
    }

    private loadWorkload() {
      if (this.ingredient.workloads && this.ingredient.workloads.user_workload) {
        this._userWorkloadService.get(this.ingredient.workloads.user_workload.id).subscribe((userWorkload) => this.userWorkload = userWorkload, (error) => console.error(error));
      }
    }

}
