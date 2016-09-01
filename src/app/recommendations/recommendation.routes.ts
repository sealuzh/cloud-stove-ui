import {RouterConfig} from '@angular/router';
import {RecommendationComponent} from './recommendation.component';
import {RecommendationListComponent} from './recommendation-list.component';

export const recommendationRoutes: RouterConfig = [
  { path: 'recommendations/:id', component: RecommendationComponent },
  { path: 'recommendations', component: RecommendationListComponent }
];
