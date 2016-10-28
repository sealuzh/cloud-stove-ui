import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { } from 'jasmine';

import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiModule } from '../../../app/api/api.module';
import { JobService } from '../../../app/api/services/job.service';

describe('API: JobService', () => {

    let mockBackend: MockBackend;
    let mockJobs = [{ id: 'asdf-1337' }, { id: 'asdf-1337' }];

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

    it('should /GET a list of jobs', inject([JobService], (service: JobService) => {

        let response = mockJobs;

        mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toContain('/jobs');
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(response) })));
        });

        service.query().subscribe(constraints => {
            expect(constraints.length).toBe(2);
            expect(constraints).toContain(response[0]);
            expect(constraints).toContain(response[1]);
        });

    }));

});
