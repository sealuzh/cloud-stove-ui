import * as request from 'request';
import { LocalStorageHelper } from './localStorageHelper';

export class LoginHelper {

    private apiUrl = process.env.API_URL || 'http://localhost:3000';
    private userLogin = { email: 'admin@thestove.io', password: 'admin' };
    private localStorage: LocalStorageHelper;

    constructor(browser: any) {
        this.localStorage = new LocalStorageHelper(browser);
    }

    login(cb) {
        request.post(this.apiUrl + '/api/auth/sign_in', { json: true, body: this.userLogin }, (err, response) => {

            let response_headers = response.headers;

            this.localStorage.setItem('Access-Token', response_headers['Access-Token'] ? response_headers['Access-Token'] : response_headers['access-token']).then(() => {
                return this.localStorage.setItem('Token-Type', response_headers['Token-Type'] ? response_headers['Token-Type'] : response_headers['token-type']);
            }).then(() => {
                return this.localStorage.setItem('Client', response_headers['Client'] ? response_headers['Client'] : response_headers['client']);
            }).then(() => {
                return this.localStorage.setItem('Expiry', response_headers['Expiry'] ? response_headers['Expiry'] : response_headers['expiry']);
            }).then(() => {
                return this.localStorage.setItem('Uid', response_headers['Uid'] ? response_headers['Uid'] : response_headers['uid']);
            }).then(() => {
                cb();
            });

        });
    }

    logout(cb) {
        this.localStorage.clear();
        cb();
    }

    get email() {
        return this.userLogin.email;
    }

    get password() {
        return this.userLogin.password;
    }

};
