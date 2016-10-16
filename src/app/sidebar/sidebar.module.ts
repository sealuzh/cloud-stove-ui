import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AuthModule } from './../auth/auth.module';
import { SidebarComponent } from './sidebar.component';
import { Gravatar } from 'ng2-gravatar-directive';
import { RouterModule }   from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [ SidebarComponent, Gravatar ],
  exports: [ SidebarComponent ]
})

export class SidebarModule { }
