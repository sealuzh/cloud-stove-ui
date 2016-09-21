import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { environment } from './app/environment';
import { AppComponent, appRouterProviders } from './app/index';
import { AuthGuard } from './app/auth/auth.guard';
import { AuthService } from './app/services/auth'
import { HTTP_PROVIDERS, ConnectionBackend } from '@angular/http';
import { ConfigService } from './app/services/configs';


if (environment.production) {
    enableProdMode();
}

bootstrap(AppComponent, [disableDeprecatedForms(), provideForms(), appRouterProviders, AuthGuard, AuthService, HTTP_PROVIDERS, ConnectionBackend, ConfigService]);
