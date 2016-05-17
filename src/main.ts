import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { enableProdMode } from '@angular/core';
import { CloudstoveUiAppComponent, environment } from './app';

if (environment.production) {
  enableProdMode();
}

bootstrap(CloudstoveUiAppComponent, [ ROUTER_PROVIDERS ]);
