import 'es6-shim';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';

// Polyfill the ECMA-402 Intl API
import 'intl';
import 'intl/locale-data/jsonp/en.js';
import 'intl/locale-data/jsonp/de.js';

require('zone.js/dist/zone');

import 'ts-helpers';

// if our ENV is build and thus production, enable the prod mode for performance
if (process.env.ENV === 'build') {
    enableProdMode();
} else {
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
