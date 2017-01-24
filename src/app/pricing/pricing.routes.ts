/**
 * @module PricingModule
 */ /** */
 
import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { PricingComponent } from './pricing.component';
import { AuthGuard } from './../auth/auth.guard';

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'pricing', component: PricingComponent, canActivate: [AuthGuard] }
]);
