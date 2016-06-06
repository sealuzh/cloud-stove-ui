import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {ApplicationService} from '../services/application';
import {Application} from '../dtos/application.dto';

@Component({
    template: require('./application-list.component.html'),
    directives: [ROUTER_DIRECTIVES]
})

export class ApplicationListComponent implements OnActivate {

    public applications: Application[];

    constructor(private _applicationService: ApplicationService) {

    }

    routerOnActivate(curr: RouteSegment): void {
        this.loadApplications();
    }

    loadApplications() {
        this._applicationService.query(null).subscribe(
            applications => this.applications = applications,
            error => console.log(error)
        );
    }

}
