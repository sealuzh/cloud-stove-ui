import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Job } from '../dtos/job.dto';

import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';

@Injectable()
export class JobService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'job', request, null, router);
    }

    query(search?: URLSearchParams): Observable<Job[]> {
        return super.query(search);
    }

    get(id: string, search?: URLSearchParams): Observable<Job> {
        return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id, this.request.getOptions(null, search))
            .map(res => <this> res.json())
            .catch(this.handleError);
    }

}
