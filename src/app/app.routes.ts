import { provideRouter, RouterConfig } from '@angular/router';

// Components
import {ApplicationComponent} from './applications/application.component';
import {IngredientComponent} from './ingredients/ingredient.component';
import {RecommendationComponent} from './recommendations/recommendation.component';
import {TemplateComponent} from './templates/template.component';
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

  // Application
  {path: 'applications', component: ApplicationComponent},

  // Ingredients
  {path: 'ingredients', component: IngredientComponent},

  // Recommendations
  {path: 'recommendations', component: RecommendationComponent},

  // Templates
  {path: 'templates', component: TemplateComponent},

  // Welcome
  {path: '*', component: WelcomeComponent},

];

export const appRouterProviders = [
  provideRouter(routes)
];
