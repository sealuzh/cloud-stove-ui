import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicationListComponent } from './application-list.component';
import { ApplicationEditorComponent } from './application-editor.component';
import { AuthGuard } from './../auth/auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {path: 'applications/:id', component: ApplicationEditorComponent, canActivate: [AuthGuard]},
  {path: 'applications', component: ApplicationListComponent, canActivate: [AuthGuard]}
]);
