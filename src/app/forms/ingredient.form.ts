import {Validators} from '@angular/common';

export class IngredientForm {
    static ingredientFields() {
        return [{
            className: 'col-xs-6',
            key: 'name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Name',
                placeholder: 'name  '
            },
            validation: Validators.compose([Validators.required])
        }, {
            className: 'col-xs-6',
            key: 'body',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Body',
                placeholder: 'body',
                pattern: ''
            },
            validation: Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(2)])
        }];
    }
}
