/**
 * @module ApiModule
 */ /** */

import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';
import { RAMWorkload } from '../dtos/workload/ram-workload.dto';

@Injectable()
export class RAMWorkloadService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'ram_workload', request, null, router);
    }

    query(search?: URLSearchParams): Observable<RAMWorkload[]> {
        return super.query(search);
    }

    get(id: number, search?: URLSearchParams): Observable<RAMWorkload> {
        return super.get(id, search);
    }

}
