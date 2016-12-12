import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';

@Injectable()
export class ProviderService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'resource', request, null, router);
    }

    names(search?: URLSearchParams): Observable<string[]> {
        return this.http.get(this.configs.apiUrl + '/providers/names', this.request.getOptions(null, null))
            .map(res => <this[]> res.json())
            .catch(err => this.handleError(err));
    }

}
