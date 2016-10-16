import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './config.service';
import {RestService} from './rest.service';
import {RequestService} from './request.service';
import {RAMWorkload} from '../dtos/workload/ram-workload.dto';

@Injectable()
export class RAMWorkloadService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'ram_workload', request, null);
    }

    query(search?: string): Observable<RAMWorkload[]> {
        return super.query(search);
    }

    get(id: number, search?: string): Observable<RAMWorkload> {
        return super.get(id, search);
    }

}
