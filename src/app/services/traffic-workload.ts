import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';
import {TrafficWorkload} from '../dtos/workload/traffic-workload.dto';

@Injectable()
export class CPUWorkloadService extends RestObjectService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'traffic_workload', request, null);
    }

    query(search?: string): Observable<TrafficWorkload[]> {
        return super.query(search);
    }

    get(id: number, search?: string): Observable<TrafficWorkload> {
        return super.get(id, search);
    }

}
