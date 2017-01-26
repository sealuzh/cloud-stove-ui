/**
 * @module SharedModule
 * @preferred
 *
 * This module provides a number of shared Pipes, Components, Directives and Services used ny the Cloud Stove Front End.
 * 
 */ /** */
 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoadingComponent } from './components/loading.component';
import { MarkdownDirective } from './directives/markdown.directive';
import { PropertyPipe } from './pipes/property.pipe';
import { SumMonthlyPipe } from './pipes/sumMonthly.pipe';
import { SumHourlyPipe } from './pipes/sumHourly.pipe';
import { ProviderColorService } from './providers/providercolor.service';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    LoadingComponent,
    MarkdownDirective,
    PropertyPipe,
    SumMonthlyPipe,
    SumHourlyPipe
  ],
  exports: [
    LoadingComponent,
    MarkdownDirective,
    PropertyPipe,
    SumMonthlyPipe,
    SumHourlyPipe
  ],
  providers: [
    ProviderColorService
  ]
})

export class SharedModule { }
