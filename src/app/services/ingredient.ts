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
        super(http, configs, 'ingredient', request, ['children', 'constraints']);
    }

    query(search: string): Observable<Ingredient[]> {
        return super.query(search);
    }

    get(id: string, search: string): Observable<Ingredient> {
        return super.get(id, search);
    }

}
