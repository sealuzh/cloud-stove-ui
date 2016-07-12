import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Constraint} from '../dtos/constraint.dto';

import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';

@Injectable()
export class ConstraintService extends RestObjectService {

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
