import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { enableProdMode } from '@angular/core';
import { environment } from './app/environment';
import { AppComponent } from './app/index';

if (environment.production) {
    enableProdMode();
}

bootstrap(AppComponent, [ROUTER_PROVIDERS]);
