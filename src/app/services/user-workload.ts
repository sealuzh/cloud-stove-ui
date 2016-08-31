import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';
import {UserWorkload} from '../dtos/workload/user-workload.dto';

@Injectable()
export class UserWorkloadService extends RestObjectService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'user_workload', request, null);
    }

    query(search?: string): Observable<UserWorkload[]> {
        return super.query(search);
    }

    get(id: number, search?: string): Observable<UserWorkload> {
        return super.get(id, search);
    }

}
