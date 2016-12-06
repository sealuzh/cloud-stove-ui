import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Ingredient } from '../dtos/ingredient.dto';
import { Recommendation } from '../dtos/recommendation.dto';

import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';

@Injectable()
export class IngredientService extends RestService {

    constructor(http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'ingredient', request, ['children', 'constraints'], router);
    }

    query(search?: URLSearchParams): Observable<Ingredient[]> {
        return super.query(search);
    }

    get(id: number, search?: URLSearchParams): Observable<Ingredient> {
        return super.get(id, search);
    }

    applications(): Observable<Ingredient[]> {
      return this.http.get(this.configs.apiUrl + '/applications', this.request.getOptions(null, null))
          .map(res => <this[]> res.json())
          .catch(this.handleError);
    }

    templates(): Observable<Ingredient[]> {
      return this.http.get(this.configs.apiUrl + '/templates', this.request.getOptions(null, null))
          .map(res => <this[]> res.json())
          .catch(this.handleError);
    }

    recommendations(id: number): Observable<Recommendation[]> {
      return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id + '/recommendations', this.request.getOptions(null, null))
          .map(res => <this> res.json())
          .catch(this.handleError);
    }

    findRecommendations(id: number): Observable<any> {
        return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id + '/has_recommendations', this.request.getOptions(null, null))
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

    instantiate(id: number): Observable<Ingredient> {
      return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id + '/instance', this.request.getOptions(null, null))
          .map(res => <this> res.json())
          .catch(this.handleError);
    }

}
