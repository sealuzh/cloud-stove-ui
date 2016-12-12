import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routes';

// Analytics
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

/* Feature Modules */
import { AuthModule } from './auth/auth.module';
import { TemplatesModule } from './templates/templates.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ApplicationsModule } from './applications/applications.module';
import { ApiModule } from './api/api.module';
import { PricingModule } from './pricing/pricing.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

import '../style/app.less';

@NgModule({
 imports: [
   Angulartics2Module.forRoot(),
   BrowserModule,
   AuthModule,
   SidebarModule,
   TemplatesModule,
   ApplicationsModule,
   ApiModule,
   RecommendationsModule,
   PricingModule,
   routing
 ],
 declarations: [
   AppComponent,
   WelcomeComponent
 ],
 bootstrap: [
   AppComponent
 ],
 providers: [
  Angulartics2GoogleAnalytics
 ]
})

export class AppModule { }
