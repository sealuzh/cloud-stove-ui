/**
 * @module ApplicationsModule
 */ /** */
 
import { Component, Input, ViewChild } from '@angular/core';
import { Ingredient } from '../../api/dtos/ingredient.dto';
import { IngredientService } from '../../api/services/ingredient.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'cs-stove-editor-name-modal',
    template: require('./name-modal.component.html')
})

export class StoveEditorNameModalComponent {

    @Input() application: Ingredient;
    @ViewChild('modal') modal: any;

    changeNameForm;

    constructor(private _ingredientService: IngredientService, private _fb: FormBuilder) {
        
        this.changeNameForm = this._fb.group({
            'appName': ['', Validators.compose([Validators.required])],
        });

        this.changeNameForm.valueChanges
            .filter((value) => this.changeNameForm.valid)
            .subscribe((value) => {
                this.application.name = value['appName'];
            });
    }

    show() {
      this.modal.show();
    }

    submit() {
        this._ingredientService.save(this.application).subscribe(result => {
            this.application = result;
        }, error => console.error(error));
    }

}
