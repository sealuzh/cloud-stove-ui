import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from '@angular/core/testing';

import {MockBackend} from '@angular/http/testing';
import {Http, Response, ResponseOptions, BaseRequestOptions} from '@angular/http';
import {provide} from '@angular/core';
import {ConfigService} from './configs';
import {RequestService} from './request';
import {JobService} from './job';

describe('Service: Job', () => {
    let mockBackend: MockBackend;
    let mockJobs = [{id: 'asdf-1337'}, {id: 'asdf-1337'}];

    beforeEachProviders(() => [
      JobService,
      ConfigService,
      RequestService,
      MockBackend,
      BaseRequestOptions,
      provide(Http, {
        useFactory: (backend, options) => new Http(backend, options),
        deps: [MockBackend, BaseRequestOptions]})
    ]);

    beforeEach(inject([MockBackend], function (_mockBackend: MockBackend) {
        mockBackend = _mockBackend;
    }));

    /**
    * /GET constraints
    */
    it('should /GET a list of jobs', inject([JobService], (service: JobService) => {

      let response = mockJobs;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/jobs');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.query().subscribe(constraints => {
        expect(constraints.length).toBe(2);
        expect(constraints).toContain(response[0]);
        expect(constraints).toContain(response[1]);
      });

    }));

    /**
    * /GET ingredients
    */
    it('should /GET a single job', inject([JobService], (service: JobService) => {

      let response = mockJobs[0];

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/jobs/asdf-1337');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.get('asdf-1337').subscribe(constraints => {
        expect(constraints).toEqual(response);
      });

    }));

});
