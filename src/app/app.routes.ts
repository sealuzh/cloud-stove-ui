import { provideRouter, RouterConfig } from '@angular/router';

// Components
import {WelcomeComponent} from './welcome/welcome.component';

import {applicationRoutes} from './applications/application.routes';
import {ingredientRoutes} from './ingredients/ingredient.routes';
import {recommendationRoutes} from './recommendations/recommendation.routes';
import {templateRoutes} from './templates/template.routes';

const routes: RouterConfig = [

  ...applicationRoutes,
  ...ingredientRoutes,
  ...recommendationRoutes,
  ...templateRoutes,

  // Welcome
  {path: '**', component: WelcomeComponent},

];

export const appRouterProviders = [
  provideRouter(routes)
];
