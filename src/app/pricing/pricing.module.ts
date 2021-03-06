/**
 * @module PricingModule
 * @preferred
 *
 * This module provides users with a sortable list-view of all recorded provider data in Cloud Stove, giving them an easy view to compare prices among different providers.
 * It allows to easily sort and filter instances based on Region, Provider and their Cost.
 * 
 * ![alt text](media://pricing.PNG "Pricing View")
 * 
 */ /** */
 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { ApiModule } from '../api/api.module';
import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { PricingComponent } from './pricing.component';
import { routing } from './pricing.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    ApiModule,
    DropdownModule,
    routing
  ],
  declarations: [ PricingComponent ]
})

export class PricingModule { }
