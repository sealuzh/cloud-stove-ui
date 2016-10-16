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
import {RecommendationService} from './recommendation';
import {IngredientService} from './ingredient';
import {JobService} from './job';

describe('Service: Recommendation', () => {
    let mockBackend: MockBackend;

    let mockTrigger = {job_id: 'asdf-1337'};
    let mockJob = {delayed_job: {attempts: 1}};
    let mockRecommendations = [{id: 1}, {id: 1}];

    beforeEachProviders(() => [
      RecommendationService,
      IngredientService,
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
    it('should /GET a list of jobs', inject([RecommendationService], (service: RecommendationService) => {

      mockBackend.connections.subscribe(connection => {
        if (connection.request.url.indexOf('trigger_recommendation') != -1) {
          connection.mockRespond(new Response(new ResponseOptions({status: 201, body: JSON.stringify(mockTrigger)})));
        } else if (connection.request.url.indexOf('jobs/asdf-1337') != -1) {
          connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(mockJob)})));
        } else {
          connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(mockRecommendations)})));
        }
      });

      service.get(1).subscribe(recommendations => {
        expect(recommendations.length).toBe(2);
        expect(recommendations).toContain(mockRecommendations[0]);
        expect(recommendations).toContain(mockRecommendations[1]);
      });

    }));

});
