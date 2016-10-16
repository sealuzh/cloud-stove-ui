import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome',  pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  { path: '**', redirectTo: '/login',  pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
