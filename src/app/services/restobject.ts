import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {ConfigService} from './configs';
import {RequestService} from './request';
import {RestObject} from '../dtos/restobject.dto';

@Injectable()
export class RestObjectService {

    protected nestedUpdate: boolean = true;

    constructor(
      protected http: Http,
      protected configs: ConfigService,
      protected resourceName: string,
      protected request: RequestService,
      private ignoreAttributes: [string]) {
    }

    query(search: string): Observable<any[]> {
        return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName(), this.request.getOptions(null, search))
            .map(res => <this[]> res.json())
            .catch(this.handleError);
    }

    get(id: number | string, search: string): Observable<any> {
        return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id, this.request.getOptions(null, search))
            .map(res => <this> res.json())
            .catch(this.handleError);
    }

    save(restObj: RestObject) {

        // bring in correct form for rails
        let saveObject = {};

        if (this.nestedUpdate) {
          saveObject[this.resourceName] = restObj;
        } else {
          saveObject = restObj;
        }

        let url = this.configs.apiUrl + '/' + this.pluralizedResourceName();

        let requestOptions = this.request.getOptions();

        // ignore certain attributes when POST/PUT
        if (this.ignoreAttributes) {
          for (let attribute of this.ignoreAttributes) {
            delete restObj[attribute];
          }
        }

        if (restObj.id) {
            url += '/' + restObj.id;
            return this.http.put(url, JSON.stringify(saveObject), requestOptions)
                .map(res => <this> res.json())
                .catch(err => this.handleError(err));
        } else {
            return this.http.post(url, JSON.stringify(saveObject), requestOptions)
                .map(res => <this> res.json())
                .catch(err => this.handleError(err));
        }
    }

    protected handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    protected pluralizedResourceName(): string {
        return this.resourceName + 's';
    }

}
