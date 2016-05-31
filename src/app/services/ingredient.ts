import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Ingredient} from '../dtos/ingredient.dto';

import {ConfigService} from './configs';
import {RestObjectService} from './restobject';
import {RequestService} from './request';

@Injectable()
export class IngredientService extends RestObjectService {

    constructor(http: Http, configs: ConfigService, request: RequestService) {
        super(http, configs, 'ingredients', request);
    }

    query(): Observable<Ingredient[]> {
        return super.query();
    }

    get(id: String): Observable<Ingredient> {
        return super.get(id);
    }

}
