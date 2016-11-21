import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';
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
    Ng2TableModule,
    DropdownModule,
    routing
  ],
  declarations: [ PricingComponent ]
})

export class PricingModule { }
