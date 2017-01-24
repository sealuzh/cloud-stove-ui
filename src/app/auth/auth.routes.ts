/**
 * @module AuthModule
 */ /** */

import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './user/change-password.component';
import { FollowUpComponent } from './user/follow-up.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password', component: ChangePasswordComponent },
  { path: 'goodbye', component: FollowUpComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
]);
