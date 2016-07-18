import {Validators} from '@angular/common';

export class RegionConstraintForm {
    static constraintFields() {
        return [{
            key: 'preferred_region_area',
            type: 'select',
            templateOptions: {
              options: [{
                label: 'Europe',
                value: 'EU'
              }, {
                label: 'United States',
                value: 'US'
              }, {
                label: 'Asia-Pacific',
                value: 'ASIA'
              }, {
                label: 'South America',
                value: 'SA'
              }],
              label: 'Region',
              placeholder: 'Select a region'
            },
            validation: Validators.compose([Validators.required])
        }];
    }
}
