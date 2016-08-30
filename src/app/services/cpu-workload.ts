import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';
import {CPUWorkload} from '../dtos/workload/cpu-workload.dto';

@Injectable()
export class CPUWorkloadService extends RestObjectService {

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
