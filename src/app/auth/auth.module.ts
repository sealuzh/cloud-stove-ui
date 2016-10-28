import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { UserComponent } from './user/user.component';
import { ChangePasswordComponent } from './user/change-password.component';
import { FollowUpComponent } from './user/follow-up.component';

import { ModalModule } from 'ng2-bootstrap/components/modal';

import { routing } from './auth.routes';

@NgModule({
  imports: [
    ModalModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [ LoginComponent, RegisterComponent, ChangePasswordComponent, FollowUpComponent, UserComponent ],
  providers:    [ AuthService, AuthGuard ]
})

export class AuthModule { }
