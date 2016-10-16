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
import {ConstraintService} from './constraint';

describe('Service: Constraint', () => {
    let mockBackend: MockBackend;
    let mockConstraints = [{id: '1'}, {id: '2'}];

    beforeEachProviders(() => [
      ConstraintService,
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
    it('should /GET a list of constraints', inject([ConstraintService], (service: ConstraintService) => {

      let response = mockConstraints;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/constraints');
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
    it('should /GET a single constraint', inject([ConstraintService], (service: ConstraintService) => {

      let response = mockConstraints[0];

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/constraints/1');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.get(1).subscribe(constraints => {
        expect(constraints).toEqual(response);
      });

    }));

});
