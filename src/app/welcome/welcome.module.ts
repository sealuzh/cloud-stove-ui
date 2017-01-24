/**
 * @module WelcomeModule
 * @preferred
 *
 * This module contains the initial view that gets presented visitors of the Cloud Stove.
 * 
 */ /** */
 
import { WelcomeComponent } from './welcome.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './welcome.routes';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [ WelcomeComponent ]
})

export class WelcomeModule { }
