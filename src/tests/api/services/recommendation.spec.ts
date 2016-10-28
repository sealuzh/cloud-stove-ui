import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { } from 'jasmine';

import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiModule } from '../../../app/api/api.module';
import { RecommendationService } from '../../../app/api/services/recommendation.service';

describe('API: RecommendationService', () => {

    let mockBackend: MockBackend;
    let mockTrigger = { job_id: 'asdf-1337' };
    let mockJob = { delayed_job: { attempts: 1 } };
    let mockRecommendations = [{ id: 1 }, { id: 1 }];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ApiModule, RouterTestingModule],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });

    beforeEach(inject([MockBackend], function(_mockBackend: MockBackend) {
        mockBackend = _mockBackend;
    }));

    /**
    * /GET constraints
    */
    it('should /GET a list of jobs', inject([RecommendationService], (service: RecommendationService) => {

        mockBackend.connections.subscribe(connection => {
            if (connection.request.url.indexOf('trigger_recommendation') !== -1) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 201, body: JSON.stringify(mockTrigger) })));
            } else if (connection.request.url.indexOf('jobs/asdf-1337') !== -1) {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(mockJob) })));
            } else {
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(mockRecommendations) })));
            }
        });

        service.get(1).subscribe(recommendations => {
            expect(recommendations.length).toBe(2);
            expect(recommendations).toContain(mockRecommendations[0]);
            expect(recommendations).toContain(mockRecommendations[1]);
        });

    }));

});
