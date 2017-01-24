/**
 * @module ApiModule
 */ /** */

import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Constraint } from '../dtos/constraint.dto';

import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';

@Injectable()
export class ConstraintService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'constraint', request, null, router);
        this.nestedUpdate = false;
    }

    query(search?: URLSearchParams): Observable<Constraint[]> {
        return super.query(search);
    }

    get(id: number, search?: URLSearchParams): Observable<Constraint> {
        return super.get(id, search);
    }

}
