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
