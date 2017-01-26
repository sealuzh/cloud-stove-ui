/**
 * @module TemplatesModule
 */ /** */

import { ModuleWithProviders }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplateListComponent } from './template-list.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
    { path: 'templates', component: TemplateListComponent }
]);
