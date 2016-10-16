import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routing } from './app.routes';

/* Feature Modules */
import { AuthModule } from './auth/auth.module';
import { TemplatesModule } from './templates/templates.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ApplicationsModule } from './applications/applications.module';
import { ApiModule } from './api/api.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

import '../style/app.less';

@NgModule({
 imports: [
   BrowserModule,
   AuthModule,
   SidebarModule,
   TemplatesModule,
   ApplicationsModule,
   ApiModule,
   RecommendationsModule,
   routing
 ],
 declarations: [
   AppComponent,
   WelcomeComponent
 ],
 bootstrap: [
   AppComponent
 ]
})

export class AppModule { }
