import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';
import {ApplicationService} from '../services/application';
import {Application} from '../dtos/application.dto';
import {MarkdownDirective} from '../shared/markdown.component';

@Component({
    template: require('./application-list.component.html'),
    styles: [require('./application-list.component.scss')],
    directives: [ROUTER_DIRECTIVES, MarkdownDirective]
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
