import {Validators} from '@angular/common';

export class RegionConstraintForm {
    static constraintFields() {
        return [{
            key: 'region_area',
            type: 'select',
            templateOptions: {
              options: [{
                label: 'EU',
                value: 'Europe'
              }, {
                label: 'US',
                value: 'United States'
              }, {
                label: 'ASIA',
                value: 'Asia-Pacific'
              }, {
                label: 'SA',
                value: 'South America'
              }],
              label: 'Region Constraint',
              placeholder: 'Select a region'
            },
            validation: Validators.compose([Validators.required])
        }];
    }
}
