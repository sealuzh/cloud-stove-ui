import { RouterConfig } from '@angular/router';
import { ApplicationListComponent } from './application-list.component';
import { ApplicationEditorComponent } from './application-editor.component';

export const applicationRoutes: RouterConfig = [
  {path: ':id/editor', component: ApplicationEditorComponent},
  {path: '**', component: ApplicationListComponent}
];
