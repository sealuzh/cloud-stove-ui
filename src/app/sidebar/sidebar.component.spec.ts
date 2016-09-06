import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';

import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {SidebarComponent} from './sidebar.component';
import {Router} from '@angular/router';
import {provide} from '@angular/core';
import {AuthService} from '../services/auth';
import {MockBackend} from '@angular/http/testing';
import {Http, BaseRequestOptions} from '@angular/http';
import {ConfigService} from '../services/configs';

describe('Component: Sidebar', () => {
    let builder: TestComponentBuilder;
    let mockBackend: MockBackend;

    beforeEachProviders(() => [
        SidebarComponent,
        AuthService,
        ConfigService,
        MockBackend,
        BaseRequestOptions,
        provide(Router, {useValue: jasmine.createSpyObj('Router', ['navigate'])}),
        provide(Http, {useFactory: (backend, options) => new Http(backend, options), deps: [MockBackend, BaseRequestOptions]})
    ]);

    beforeEach(inject([MockBackend], function (_mockBackend: MockBackend) {
        mockBackend = _mockBackend;
    }));

    beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([SidebarComponent, Router],
      (component: SidebarComponent) => {
          expect(component).toBeTruthy();
    }));
});

@Component({
    selector: 'test',
    template: `
    <hb-sidebar></hb-sidebar>
  `,
    directives: [SidebarComponent]
})

class SidebarComponentTestController {

}
