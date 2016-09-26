import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ConfigService} from './configs';

@Injectable()
export class AuthService {

    constructor(private _http: Http, private _config: ConfigService) {
    }

    changePassword(password: string, password_confirmation: string){
        let user = {password: password, password_confirmation: password_confirmation};
        let headers = new Headers();

        if (localStorage.getItem('Access-Token')) {
            headers.append('Access-Token', localStorage.getItem('Access-Token'));
            headers.append('Token-Type', localStorage.getItem('Token-Type'));
            headers.append('Client', localStorage.getItem('Client'));
            headers.append('Uid', localStorage.getItem('Uid'));
            headers.append('Expiry', localStorage.getItem('Expiry'));
        }

        return Observable.create( subscriber => {
                this.PUT(headers, user, this._config.apiUrl + '/api/auth/password').subscribe(
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

    deleteAccount(){
        let headers = new Headers();

        if (localStorage.getItem('Access-Token')) {
            headers.append('Access-Token', localStorage.getItem('Access-Token'));
            headers.append('Token-Type', localStorage.getItem('Token-Type'));
            headers.append('Client', localStorage.getItem('Client'));
            headers.append('Uid', localStorage.getItem('Uid'));
            headers.append('Expiry', localStorage.getItem('Expiry'));
        }

        return Observable.create( subscriber => {
                this.DELETE(headers, this._config.apiUrl + '/api/auth/').subscribe(
                    result => {
                        this.logout();
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

    register(email: string, password: string, password_confirmation: string): Observable<any>  {
        let user = {email: email, password: password, password_confirmation: password_confirmation, confirm_success_url: ''};
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
        let user = {email: email, password: password, confirm_success_url: ''};
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

    tokenPresent(): boolean {
        return localStorage.getItem('Access-Token') != null;
    }

    validate(): Observable<any> {
        if (this.tokenPresent()){
            let headers = new Headers();
            headers.append('Access-Token', localStorage.getItem('Access-Token'));
            headers.append('Token-Type', localStorage.getItem('Token-Type'));
            headers.append('Client', localStorage.getItem('Client'));
            headers.append('Expiry', localStorage.getItem('Expiry'));
            headers.append('Uid', localStorage.getItem('Uid'));
            return this._http.get(this._config.apiUrl + '/api/auth/validate_token',{headers: headers});
        }else{
            return Observable.create(observer => {
                // Yield a single value and complete
                observer.error('invalid');
                observer.complete();
                return
            });
        }
    }

    getUser() {
        return localStorage.getItem('Uid');
    }

    authToken(): string {
        return localStorage.getItem('Access-Token');
    }

    private POST(headers: Headers, payload: any, url: string): Observable<any> {
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this._http.post(url, JSON.stringify(payload), {headers: headers});
    }

    private DELETE(headers: Headers, url: string): Observable<any> {
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this._http.delete(url, {headers: headers});
    }



    private PUT(headers: Headers, payload: any, url: string): Observable<any> {
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this._http.put(url, JSON.stringify(payload), {headers: headers});
    }

    private handleLogin(result: Response) {
        let response_headers = result.headers;
        localStorage.setItem('Access-Token', response_headers.get('Access-Token') ? response_headers.get('Access-Token') : response_headers.get('access-token'));
        localStorage.setItem('Token-Type', response_headers.get('Token-Type') ? response_headers.get('Token-Type') : response_headers.get('token-type'));
        localStorage.setItem('Client', response_headers.get('Client') ? response_headers.get('Client') : response_headers.get('client'));
        localStorage.setItem('Expiry', response_headers.get('Expiry') ? response_headers.get('Expiry') : response_headers.get('expiry'));
        localStorage.setItem('Uid', response_headers.get('Uid') ? response_headers.get('Uid') : response_headers.get('uid'));
    }
}
