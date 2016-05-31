import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {ConfigService} from './configs';
import {RequestService} from './request';
import {RestObject} from '../dtos/restobject.dto';

@Injectable()
export class RestObjectService {

    constructor(private http: Http, private configs: ConfigService, private resourceName: String, private request: RequestService) {

    }

    query(): Observable<any[]> {
        return this.http.get(this.configs.apiUrl + '/' + this.resourceName, this.request.getOptions())
            .map(res => <this[]> res.json())
            .catch(this.handleError);
    }

    get(id: String): Observable<any> {
        return this.http.get(this.configs.apiUrl + '/' + this.resourceName + '/' + id)
            .map(res => <this> res.json())
            .catch(this.handleError);
    }

    save(restObj: RestObject) {
        let url = this.configs.apiUrl + '/' + this.resourceName;

        let requestOptions = this.request.getOptions();
        requestOptions.headers.append('Content-Type', 'application/json');

        if (restObj.id) {
            url += '/' + restObj.id;
            return this.http.put(url, JSON.stringify(restObj), requestOptions)
                .map(res => <this> res.json())
                .catch(err => this.handleError(err));
        } else {
            return this.http.post(url, JSON.stringify(restObj), requestOptions)
                .map(res => <this> res.json())
                .catch(err => this.handleError(err));
        }
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
