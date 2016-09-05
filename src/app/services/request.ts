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


        if (localStorage.getItem('access-token')) {
            requestOptions.headers.append('access-token', localStorage.getItem('access-token'));
            requestOptions.headers.append('token-type', localStorage.getItem('token-type'));
            requestOptions.headers.append('client', localStorage.getItem('client'));
            requestOptions.headers.append('uid', localStorage.getItem('uid'));
            requestOptions.headers.append('expiry', localStorage.getItem('expiry'));
        }

        return requestOptions;
    }
}
