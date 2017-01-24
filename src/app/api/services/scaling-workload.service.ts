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
import { ScalingWorkload } from '../dtos/workload/scaling-workload.dto';

@Injectable()
export class ScalingWorkloadService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'scaling_workload', request, null, router);
    }

    query(search?: URLSearchParams): Observable<ScalingWorkload[]> {
        return super.query(search);
    }

    get(id: number, search?: URLSearchParams): Observable<ScalingWorkload> {
        return super.get(id, search);
    }

}
