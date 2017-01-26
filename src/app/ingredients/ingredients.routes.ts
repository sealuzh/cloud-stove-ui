/**
 * @module IngredientsModule
 */ /** */
 
import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { IngredientDetailComponent } from './ingredient-detail.component';
import { IngredientListComponent } from './ingredient-list.component';
import { AuthGuard } from './../auth/auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {path: 'ingredients/:id', component: IngredientDetailComponent, canActivate: [AuthGuard]},
  {path: 'ingredients', component: IngredientListComponent, canActivate: [AuthGuard]}
]);
