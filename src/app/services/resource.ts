import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Resource} from '../dtos/resource.dto';

import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';

@Injectable()
export class ResourceService extends RestObjectService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'resource', request, null);
    }

    query(search: string): Observable<Resource[]> {
        return super.query(search);
    }

    get(id: number, search: string): Observable<Resource> {
        return super.get(id, search);
    }

}
