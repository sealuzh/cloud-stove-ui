/**
 * Created by gmazlami on 9/6/16.
 */

// The following was taken from https://angular.io/docs/ts/latest/guide/router.html#!#can-activate-guard

import { Injectable }   from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('Access-Token')) {
            return true;
        } else {
            this._router.navigateByUrl('/login');
            return false;
        }

    }
}
