import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoadingComponent } from './loading.component';
import { MarkdownDirective } from './markdown.directive';
import { PropertyPipe } from './property.pipe';
import { SumMonthlyPipe } from './sumMonthly.pipe';
import { SumHourlyPipe } from './sumHourly.pipe';
import { ProviderColorService } from './providercolor.service';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [ LoadingComponent, MarkdownDirective, PropertyPipe, SumMonthlyPipe, SumHourlyPipe ],
  exports: [ LoadingComponent, MarkdownDirective, PropertyPipe, SumMonthlyPipe, SumHourlyPipe ],
  providers: [ ProviderColorService ]
})

export class SharedModule { }
