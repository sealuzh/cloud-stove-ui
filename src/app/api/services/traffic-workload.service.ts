import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './config.service';
import {RestService} from './rest.service';
import {RequestService} from './request.service';
import {TrafficWorkload} from '../dtos/workload/traffic-workload.dto';

@Injectable()
export class TrafficWorkloadService extends RestService {

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
