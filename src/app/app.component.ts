import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
/**
 * @module AppModule
 */ /** */
 
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'cs-app',
  template: require('./app.component.html')
})

export class AppComponent implements OnInit {

  // necessary for ng2-bootstrap
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef: ViewContainerRef, private _authService: AuthService, private _router: Router) {
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {

      // check if token is still valid
      this._authService.validate().subscribe(
        result => {
            this._router.navigateByUrl('/applications');
        },
        error => {
            this._router.navigateByUrl('/login');
        }
      );

  }

}
