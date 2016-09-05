import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './configs';


@Injectable()
export class AuthService {

    constructor(private _http: Http, private _config: ConfigService) {
    }

    register(email: string, password: string, password_confirmation: string)  {
        let user = {email: email, password: password, password_confirmation:password_confirmation, confirm_success_url:''};
        let headers = new Headers();
        this.POST(headers, user, this._config.apiUrl + '/api/auth/').subscribe(this.handleLogin);
    }

    login(email: string, password: string) {
        let user = {email: email, password: password, confirm_success_url:''};
        let headers = new Headers();
        this.POST(headers, user, this._config.apiUrl + '/api/auth/sign_in').subscribe(this.handleLogin);
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('access-token') != null;
    }

    getUser() {
        return localStorage.getItem('uid');
    }

    authToken(): string {
        return localStorage.getItem('access-token');
    }

    private POST(headers: Headers, payload: any, url:string): Observable<any> {
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        return this._http.post(url, JSON.stringify(payload), {headers: headers})
            .catch(err => this.handleError(err));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private handleLogin(result: Response) {
        let response_headers = result.headers;

        localStorage.setItem('access-token', response_headers.get('access-token'));
        localStorage.setItem('token-type', response_headers.get('Bearer'));
        localStorage.setItem('client', response_headers.get('client'));
        localStorage.setItem('expiry', response_headers.get('expiry'));
        localStorage.setItem('uid', response_headers.get('uid'));
    }
}