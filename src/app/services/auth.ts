import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './configs';


@Injectable()
export class AuthService {

    constructor(private _http: Http, private _config: ConfigService) {
    }

    register(email: string, password: string, password_confirmation: string): Observable<any>  {
        let user = {email: email, password: password, password_confirmation:password_confirmation, confirm_success_url:''};
        let headers = new Headers();

        return Observable.create( subscriber => {
                this.POST(headers, user, this._config.apiUrl + '/api/auth/').subscribe(
                    result => {
                        this.handleLogin(result);
                        subscriber.next(result);
                        subscriber.complete();
                    },
                    error => {
                        subscriber.error(error);
                        subscriber.complete();
                    }
                );
            }
        );

    }


    login(email: string, password: string): Observable<any> {
        let user = {email: email, password: password, confirm_success_url:''};
        let headers = new Headers();

        return Observable.create( subscriber => {
                this.POST(headers, user, this._config.apiUrl + '/api/auth/sign_in').subscribe(
                    result => {
                        this.handleLogin(result);
                        subscriber.next(result);
                        subscriber.complete();
                    },
                    error => {
                        subscriber.error(error);
                        subscriber.complete();
                    }
                );
            }
        );

    }


    logout() {
        localStorage.clear();
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('Access-Token') != null;
    }

    getUser() {
        return localStorage.getItem('Uid');
    }

    authToken(): string {
        return localStorage.getItem('Access-Token');
    }

    private POST(headers: Headers, payload: any, url:string): Observable<any> {
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        return this._http.post(url, JSON.stringify(payload), {headers: headers});
    }

    private handleLogin(result: Response) {
        let response_headers = result.headers;
        console.log(result.headers);
        localStorage.setItem('Access-Token', response_headers.get('Access-Token'));
        localStorage.setItem('Token-Type', response_headers.get('Token-Type'));
        localStorage.setItem('Client', response_headers.get('Client'));
        localStorage.setItem('Expiry', response_headers.get('Expiry'));
        localStorage.setItem('Uid', response_headers.get('Uid'));
    }
}