import {RouterConfig} from '@angular/router';
import {RecommendationListComponent} from './recommendation-list.component';
import {RecommendationDetailComponent} from './recommendation-detail.component';

export const recommendationRoutes: RouterConfig = [
  { path: 'recommendations/:id', component: RecommendationDetailComponent },
  { path: 'recommendations', component: RecommendationListComponent }
];
