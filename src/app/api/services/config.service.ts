/**
 * @module ApiModule
 */ /** */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConfigService {
  
  public apiUrl = process.env.API_URL;

  constructor(private _http: Http) {

  }

  load() {
    this._http.get('/config')
      .map(res => <this> res.json())
      .catch(err => Observable.throw(err.json().error || 'Server error'))
      .subscribe(result => {
        this.apiUrl = result['API_URL'];
      }, error => {
        console.warn('could not load config. ignore unless this is production');
      });
  }

}
