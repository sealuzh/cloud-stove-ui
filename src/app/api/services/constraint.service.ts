import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Constraint} from '../dtos/constraint.dto';

import {ConfigService} from './config.service';
import {RestService} from './rest.service';
import {RequestService} from './request.service';

@Injectable()
export class ConstraintService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'constraint', request, null);
        this.nestedUpdate = false;
    }

    query(search?: string): Observable<Constraint[]> {
        return super.query(search);
    }

    get(id: number, search?: string): Observable<Constraint> {
        return super.get(id, search);
    }

}
