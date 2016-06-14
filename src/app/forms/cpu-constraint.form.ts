import {Validators} from '@angular/common';

export class CPUConstraintForm {
    static constraintFields() {
        return [{
            key: 'min_cpus',
            type: 'input',
            templateOptions: {
                type: 'number',
                label: 'Cores',
                placeholder: '2'
            },
            validation: Validators.compose([Validators.required])
        }];
    }
}
