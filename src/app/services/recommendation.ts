import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Recommendation} from '../dtos/recommendation.dto';

import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';

@Injectable()
export class RecommendationService extends RestObjectService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'recommendation', request, null);
    }

    query(search: string): Observable<Recommendation[]> {
        return super.query(search);
    }

    get(id: number, search: string): Observable<Recommendation> {
        return super.get(id, search);
    }

}
