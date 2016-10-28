import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'cs-app',
  template: require('./app.component.html')
})

export class AppComponent implements OnInit {

  // necessary for ng2-bootstrap
  private viewContainerRef: ViewContainerRef;

  public constructor(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit() {

      // check if token is still valid
      /*
      this.authService.validate().subscribe(
        result =>{
            this.router.navigateByUrl('/applications');
        },
        error => {
            this.router.navigateByUrl('/login');
        }
      );
      */

  }

}
