/**
 * @module IngredientsModule
 * @preferred
 *
 * Responsible displaying, listing and editing ingredients. 
 *
 */ /** */

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { ApiModule } from '../api/api.module';

import { routing } from './ingredients.routes';

import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { ModalModule } from 'ng2-bootstrap/components/modal';

import { IngredientDetailComponent } from './ingredient-detail.component';
import { IngredientListComponent } from './ingredient-list.component';
import { IngredientWorkloadFormComponent } from './ingredient-workload.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    ApiModule,
    DropdownModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  exports: [ IngredientDetailComponent ],
  declarations: [ IngredientDetailComponent, IngredientListComponent, IngredientWorkloadFormComponent ]
})

export class IngredientsModule { }
