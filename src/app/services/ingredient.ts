import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Ingredient} from '../dtos/ingredient.dto';
import {Recommendation} from '../dtos/recommendation.dto';

import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';

@Injectable()
export class IngredientService extends RestObjectService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'ingredient', request, ['children', 'constraints']);
    }

    query(search: string): Observable<Ingredient[]> {
        return super.query(search);
    }

    get(id: number, search: string): Observable<Ingredient> {
        return super.get(id, search);
    }

    getApplications(): Observable<Ingredient[]> {
      return this.http.get(this.configs.apiUrl + '/applications', this.request.getOptions(null, null))
          .map(res => <this[]> res.json())
          .catch(this.handleError);
    }

    recommendation(id: number): Observable<Recommendation> {
      return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id + '/recommendation', this.request.getOptions(null, null))
          .map(res => <this> res.json())
          .catch(this.handleError);
    }

    copy(id: number): Observable<Ingredient> {
      return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id + '/copy', this.request.getOptions(null, null))
          .map(res => <this> res.json())
          .catch(this.handleError);
    }

    triggerRecommendation(id: number): Observable<{job_id: string}> {
      return this.http.put(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id + '/trigger_recommendation', null, this.request.getOptions(null, null))
          .map(res => <this> res.json())
          .catch(this.handleError);
    }

}
