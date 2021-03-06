/**
 * @module TemplatesModule
 * @preferred
 * 
 * The template view renders all defined templates of The Cloud Stove, using Markdown Syntax. This is achieved using the csMarkdown-Directive,
 * located in the SharedModule of the project.
 * 
 * ![alt text](media://templates.PNG "Templates List View")
 * 
 */ /** */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared/shared.module';
import { ApiModule } from '../api/api.module';
import { TemplateListComponent } from './template-list.component';
import { routing } from './templates.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ApiModule,
    routing
  ],
  declarations: [ TemplateListComponent ]
})

export class TemplatesModule { }
