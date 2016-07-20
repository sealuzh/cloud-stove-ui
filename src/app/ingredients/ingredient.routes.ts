import { RouterConfig } from '@angular/router';
import { IngredientListComponent } from './ingredient-list.component';
import { IngredientDetailComponent } from './ingredient-detail.component';

export const ingredientRoutes: RouterConfig = [
  {path: ':id', component: IngredientDetailComponent},
  {path: '**', component: IngredientListComponent}
];
