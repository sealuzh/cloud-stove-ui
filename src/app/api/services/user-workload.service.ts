/**
 * @module ApiModule
 */ /** */

import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';
import { UserWorkload } from '../dtos/workload/user-workload.dto';

@Injectable()
export class UserWorkloadService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'user_workload', request, null, router);
    }

    query(search?: URLSearchParams): Observable<UserWorkload[]> {
        return super.query(search);
    }

    get(id: number, search?: URLSearchParams): Observable<UserWorkload> {
        return super.get(id, search);
    }

}
