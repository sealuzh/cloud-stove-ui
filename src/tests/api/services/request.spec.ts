import { TestBed, inject } from '@angular/core/testing';
import { } from 'jasmine';

import { Headers } from '@angular/http';
import { RequestService } from '../../../app/api/services/request.service';
import { ApiModule } from '../../../app/api/api.module';

describe('API: RequestService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ApiModule]
        });
    });

    it('should properly set the Content-Type and Accept-Header', inject([RequestService], (service: RequestService) => {
        let requestOptions = service.getOptions();
        expect(requestOptions.headers.get('Accept')).toBe('application/json');
        expect(requestOptions.headers.get('Content-Type')).toBe('application/json');
    }));

    it('should include additional headers if provided', inject([RequestService], (service: RequestService) => {
        let requestOptions = service.getOptions(new Headers({ 'X-CUSTOM-HEADER': 'custom' }));
        expect(requestOptions.headers.get('Accept')).toBe('application/json');
        expect(requestOptions.headers.get('Content-Type')).toBe('application/json');
        expect(requestOptions.headers.get('X-CUSTOM-HEADER')).toBe('custom');
    }));

    it('should include search-params', inject([RequestService], (service: RequestService) => {
        let requestOptions = service.getOptions(null, 'this=is&a=test');
        expect(requestOptions.search.get('this')).toBe('is');
        expect(requestOptions.search.get('a')).toBe('test');
    }));

});