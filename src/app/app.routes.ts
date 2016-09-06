import { provideRouter, RouterConfig } from '@angular/router';

// Components
import {LoginComponent} from './auth/login/login.component';

import {applicationRoutes} from './applications/application.routes';
import {ingredientRoutes} from './ingredients/ingredient.routes';
import {recommendationRoutes} from './recommendations/recommendation.routes';
import {templateRoutes} from './templates/template.routes';
import {authRoutes} from './auth/auth.routes';

const routes: RouterConfig = [

  ...applicationRoutes,
  ...ingredientRoutes,
  ...recommendationRoutes,
  ...templateRoutes,
  ...authRoutes,

  // Welcome
  {path: '**', component: LoginComponent},

];

export const appRouterProviders = [
  provideRouter(routes)
];
