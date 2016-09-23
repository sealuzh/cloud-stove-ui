import { RouterConfig } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './user/change-password.component';
import { FollowUpComponent } from './user/follow-up.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard'

export const authRoutes: RouterConfig = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'password', component: ChangePasswordComponent },
    { path: 'goodbye', component: FollowUpComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
];