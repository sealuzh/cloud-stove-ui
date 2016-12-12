import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class RequestService {

    private urlSearchParams: URLSearchParams;

    getOptions(headers?: Headers, search?: URLSearchParams): RequestOptions {
        if (!headers) {
            headers = new Headers();
        }

        if (search) {
           this.urlSearchParams = search;
        }

        let requestOptions: RequestOptions = new RequestOptions({
            headers: headers,
            search: this.urlSearchParams
        });

        requestOptions.headers.append('Accept', 'application/json');
        requestOptions.headers.append('Content-Type', 'application/json');


        if (localStorage.getItem('Access-Token')) {
            requestOptions.headers.append('Access-Token', localStorage.getItem('Access-Token'));
            requestOptions.headers.append('Token-Type', localStorage.getItem('Token-Type'));
            requestOptions.headers.append('Client', localStorage.getItem('Client'));
            requestOptions.headers.append('Uid', localStorage.getItem('Uid'));
            requestOptions.headers.append('Expiry', localStorage.getItem('Expiry'));
        }

        return requestOptions;
    }
}
