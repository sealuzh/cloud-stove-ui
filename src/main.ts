import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter, RouterConfig } from '@angular/router';
import { enableProdMode } from '@angular/core';
import { environment } from './app/environment';
import { AppComponent, appRouterProviders } from './app/index';

if (environment.production) {
    enableProdMode();
}

bootstrap(AppComponent, [appRouterProviders]);
