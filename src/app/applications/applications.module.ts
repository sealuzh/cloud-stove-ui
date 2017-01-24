/**
 * @module ApplicationsModule
 * @preferred
 *
 * This module provides users with the functionality to
 *
 * - View all their applications under /applications
 * - View and edit a specific application under /applications/:id
 *
 * It also includes the StoveEditor, which is an interactive drag-based modeler for Cloud Stove applications.
 *
 */ /** */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';
import { ApiModule } from '../api/api.module';
import { IngredientsModule } from '../ingredients/ingredients.module';

import { ApplicationListComponent } from './application-list.component';
import { ApplicationEditorComponent } from './application-editor.component';
import { StoveEditorIngredientComponent } from './application-editor-ingredient.component';
import { StoveEditorDependencyConstraintComponent } from './application-editor-constraint.component';
import { StoveEditorDependencyModalComponent } from './application-editor-dependency-modal.component';
import { DraggableDirective } from './editor/draggable.directive';
import { ConnectionDirective } from './editor/connection.directive';
import { PositionDirective } from './editor/position.directive';

import { routing } from './applications.routes';

import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { ModalModule } from 'ng2-bootstrap/components/modal';

/**
 * This module provides users with the functionality to
 * 
 * - View all their applications under /applications
 * - View and edit a specific application under /applications/:id
 * 
 * It also includes the StoveEditor, which is an interactive drag-based modeler for Cloud Stove applications.
 * 
 */
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ApiModule,
    DropdownModule,
    ModalModule,
    IngredientsModule,
    routing
  ],
  declarations: [
    ApplicationListComponent,
    ApplicationEditorComponent,
    StoveEditorIngredientComponent,
    StoveEditorDependencyConstraintComponent,
    StoveEditorDependencyModalComponent,
    PositionDirective,
    DraggableDirective,
    ConnectionDirective
  ]
})

export class ApplicationsModule { }
