import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';
import { CPUWorkload } from '../dtos/workload/cpu-workload.dto';
import { Router } from '@angular/router';

@Injectable()
export class CPUWorkloadService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'cpu_workload', request, null, router);
    }

    query(search?: URLSearchParams): Observable<CPUWorkload[]> {
        return super.query(search);
    }

    get(id: number, search?: URLSearchParams): Observable<CPUWorkload> {
        return super.get(id, search);
    }

}
