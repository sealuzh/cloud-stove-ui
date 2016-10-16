import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {ConfigService} from './config.service';
import {RestObject} from '../dtos/restobject.dto';
import {RequestService} from './request.service';

@Injectable()
export class RestService {

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
            .catch(err => this.handleError(err));
    }

    get(id: number | string, search: string): Observable<any> {
        return this.http.get(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + id, this.request.getOptions(null, search))
            .map(res => <this> res.json())
            .catch(err => this.handleError(err));
    }

    save(restObj: RestObject): Observable<any> {

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
            delete saveObject[attribute];
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

    delete(restObj: RestObject) {
      return this.http.delete(this.configs.apiUrl + '/' + this.pluralizedResourceName() + '/' + restObj.id, this.request.getOptions(null, null))
          .map(res => res)
          .catch(err => this.handleError(err));
    }

    protected handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    protected pluralizedResourceName(): string {
        return this.resourceName + 's';
    }

}
