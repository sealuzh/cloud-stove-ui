import 'es6-shim';
import 'reflect-metadata';
import { environment } from './app/environment';

require('zone.js/dist/zone');

import 'ts-helpers';

if (environment.production) {
    // Production

} else {
    // Development

    Error['stackTraceLimit'] = Infinity;

    require('zone.js/dist/long-stack-trace-zone');
}
