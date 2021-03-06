/**
 * @module SidebarModule
 * @preferred
 * 
 * Displays the side navigation of the frontend.
 * 
 */ /** */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AuthModule } from './../auth/auth.module';
import { SidebarComponent } from './sidebar.component';
import { Gravatar } from 'ng2-gravatar-directive';
import { RouterModule }   from '@angular/router';
import { CollapseModule } from 'ng2-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    CollapseModule,
    RouterModule
  ],
  declarations: [ SidebarComponent, Gravatar ],
  exports: [ SidebarComponent ]
})

export class SidebarModule { }
