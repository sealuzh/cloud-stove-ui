import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecommendationComponent } from './recommendation.component';
import { RecommendationListComponent } from './recommendation-list.component';
import { AuthGuard } from './../auth/auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'recommendations/:id', component: RecommendationComponent, canActivate: [AuthGuard] },
  { path: 'recommendations', component: RecommendationListComponent, canActivate: [AuthGuard] }
]);
