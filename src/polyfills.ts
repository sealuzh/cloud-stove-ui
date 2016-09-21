import 'es6-shim';
import 'reflect-metadata';
import { environment } from './app/environment';
import { enableProdMode } from '@angular/core';

// Polyfill the ECMA-402 Intl API
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/de.js';

require('zone.js/dist/zone');

import 'ts-helpers';

if (!environment.production) {
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
