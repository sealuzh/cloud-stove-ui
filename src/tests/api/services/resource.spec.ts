import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { } from 'jasmine';

import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { ApiModule } from '../../../app/api/api.module';
import { ResourceService } from '../../../app/api/services/resource.service';

describe('API: JobService', () => {

    let mockBackend: MockBackend;
    let mockResource = [{ id: '1' }, { id: '2' }];

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
    * /GET resources
    */
    it('should /GET a list of resources', inject([ResourceService], (service: ResourceService) => {

        let response = mockResource;

        mockBackend.connections.subscribe(connection => {
            expect(connection.request.url).toContain('/resources');
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(response) })));
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
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: JSON.stringify(response) })));
        });

        service.get(1).subscribe(constraints => {
            expect(constraints).toEqual(response);
        });

    }));


});
