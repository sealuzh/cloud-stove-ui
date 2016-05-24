import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Ingredient} from '../dtos/ingredient';

import {ConfigService} from './configs';

@Injectable()
export class CameraService {

    constructor(private http: Http, private configs: ConfigService) {

    }

    getIngredients() {
        return this.http.get(this.configs.apiUrl + '/api/ingredients')
            .map(res => <Ingredient[]> res.json())
            .catch(this.handleError);
    }

    getIngredient(id: String) {
        return this.http.get(this.configs.apiUrl + '/api/ingredients/' + id)
            .map(res => <Ingredient> res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
