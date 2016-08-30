import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';
import {RAMWorkload} from '../dtos/workload/ram-workload.dto';

@Injectable()
export class RAMWorkloadService extends RestObjectService {

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
