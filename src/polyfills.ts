import 'es6-shim';
import 'reflect-metadata';
import { environment } from './app/environment';

// Polyfill the ECMA-402 Intl API
import 'intl';

require('zone.js/dist/zone');

import 'ts-helpers';

if (environment.production) {
    // Production

} else {
    // Development

    Error['stackTraceLimit'] = Infinity;

    require('zone.js/dist/long-stack-trace-zone');
}
