import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { environment } from './app/environment';
import { AppComponent, appRouterProviders } from './app/index';
import { AuthGuard } from './app/auth/auth.guard';

if (environment.production) {
    enableProdMode();
}

bootstrap(AppComponent, [disableDeprecatedForms(), provideForms(), appRouterProviders, AuthGuard]);
