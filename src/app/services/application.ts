import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Application} from '../dtos/application.dto';

import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';

@Injectable()
export class ApplicationService extends RestObjectService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'application', request, null);
    }

    get(id: number, search: string): Observable<Application> {
        return super.get(id, search);
    }

}
