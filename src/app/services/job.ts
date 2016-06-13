import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Job} from '../dtos/job.dto';

import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';

@Injectable()
export class JobService extends RestObjectService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'job', request, null);
    }

    query(search: string): Observable<Job[]> {
        return super.query(search);
    }

    get(id: number, search: string): Observable<Job> {
        return super.get(id, search);
    }

}
