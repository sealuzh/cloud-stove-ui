import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';

import {RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class RequestService {

    private urlSearchParams: URLSearchParams;

    getOptions(headers?: Headers, search?: string): RequestOptions {
        if (!headers) {
            headers = new Headers();
        }

        if (search) {
           this.urlSearchParams = new URLSearchParams(search);
        } else {
           this.urlSearchParams = new URLSearchParams();
        }

        let requestOptions: RequestOptions = new RequestOptions({
            headers: headers,
            search: this.urlSearchParams
        });

        requestOptions.headers.append('Accept', 'application/json');
        requestOptions.headers.append('Content-Type', 'application/json');

        return requestOptions;
    }
}
