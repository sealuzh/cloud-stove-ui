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
import {ResourceService} from './resource';

describe('Service: Constraint', () => {
    let mockBackend: MockBackend;
    let mockResource = [{id: '1'}, {id: '2'}];

    beforeEachProviders(() => [
      ResourceService,
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
    * /GET resources
    */
    it('should /GET a list of resources', inject([ResourceService], (service: ResourceService) => {

      let response = mockResource;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/resources');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.query().subscribe(constraints => {
        expect(constraints.length).toBe(2);
        expect(constraints).toContain(response[0]);
        expect(constraints).toContain(response[1]);
      });

    }));

    /**
    * /GET/:id resources
    */
    it('should /GET a single resource', inject([ResourceService], (service: ResourceService) => {

      let response = mockResource[0];

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/resources/1');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.get(1).subscribe(constraints => {
        expect(constraints).toEqual(response);
      });

    }));

});
