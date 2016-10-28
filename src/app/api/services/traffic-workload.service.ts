import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';
import { TrafficWorkload } from '../dtos/workload/traffic-workload.dto';

@Injectable()
export class TrafficWorkloadService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'traffic_workload', request, null, router);
    }

    query(search?: string): Observable<TrafficWorkload[]> {
        return super.query(search);
    }

    get(id: number, search?: string): Observable<TrafficWorkload> {
        return super.get(id, search);
    }

}
