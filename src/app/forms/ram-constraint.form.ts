import {Validators} from '@angular/common';

export class RamConstraintForm {
    static constraintFields() {
        return [{
            key: 'min_ram',
            type: 'input',
            templateOptions: {
                type: 'number',
                label: 'Minimum Ram',
                placeholder: '512'
            },
            validation: Validators.compose([Validators.required])
        }];
    }
}
