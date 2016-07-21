import { RouterConfig } from '@angular/router';
import { IngredientListComponent } from './ingredient-list.component';
import { IngredientDetailComponent } from './ingredient-detail.component';

export const ingredientRoutes: RouterConfig = [
  {path: 'ingredients/:id', component: IngredientDetailComponent},
  {path: 'ingredients', component: IngredientListComponent}
];
