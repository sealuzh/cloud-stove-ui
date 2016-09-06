import { RouterConfig } from '@angular/router';
import { IngredientListComponent } from './ingredient-list.component';
import { IngredientDetailComponent } from './ingredient-detail.component';
import { AuthGuard } from '../auth/auth.guard';

export const ingredientRoutes: RouterConfig = [
  {path: 'ingredients/:id', component: IngredientDetailComponent, canActivate: [AuthGuard]},
  {path: 'ingredients', component: IngredientListComponent, canActivate: [AuthGuard]}
];
