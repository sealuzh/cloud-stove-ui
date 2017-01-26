/**
 * @module ApiModule
 */ /** */

import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Resource } from '../dtos/resource.dto';

import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';

@Injectable()
export class ResourceService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'resource', request, null, router);
    }

    query(search?: URLSearchParams): Observable<Resource[]> {
        return super.query(search);
    }

    get(id: number, search?: URLSearchParams): Observable<Resource> {
        return super.get(id, search);
    }

    regionAreas(): Observable<string[]> {
        return this.http.get(this.configs.apiUrl + '/resources_region_areas', this.request.getOptions(null, null))
            .map(res => <this[]> res.json())
            .catch(err => this.handleError(err));
    }

}
