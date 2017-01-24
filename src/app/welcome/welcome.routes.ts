/**
 * @module WelcomeModule
 */ /** */

import { WelcomeComponent } from './welcome.component';
import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'welcome', component: WelcomeComponent }
]);
