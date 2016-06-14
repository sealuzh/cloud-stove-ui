import {Validators} from '@angular/common';

export class IngredientForm {
    static ingredientFields() {
        return [{
            key: 'name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Name',
                placeholder: 'name  '
            },
            validation: Validators.compose([Validators.required])
        }, {
            key: 'body',
            type: 'textarea',
            templateOptions: {
                rows: 15,
                type: 'text',
                label: 'Body',
                placeholder: 'body',
                pattern: ''
            },
            validation: Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(2)])
        }];
    }
}
