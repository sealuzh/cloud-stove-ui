import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './config.service';
import {RestService} from './rest.service';
import {RequestService} from './request.service';
import {CPUWorkload} from '../dtos/workload/cpu-workload.dto';

@Injectable()
export class CPUWorkloadService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'cpu_workload', request, null);
    }

    query(search?: string): Observable<CPUWorkload[]> {
        return super.query(search);
    }

    get(id: number, search?: string): Observable<CPUWorkload> {
        return super.get(id, search);
    }

}
