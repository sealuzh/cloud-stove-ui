import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

import {RequestOptions} from '@angular/http';

@Injectable()
export class RequestService {
    getOptions(headers?: Headers): RequestOptions {
        if (!headers) {
            headers = new Headers();
        }

        return new RequestOptions({
            headers: headers
        });
    }
}
