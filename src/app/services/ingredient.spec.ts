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
import {IngredientService} from './ingredient';

describe('Service: Ingredient', () => {
    let mockBackend: MockBackend;
    let mockIngredients = [{id: '1'}, {id: '2'}];

    beforeEachProviders(() => [
      IngredientService,
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
    * /GET ingredients
    */
    it('should /GET a list of ingredients', inject([IngredientService], (service: IngredientService) => {

      let response = mockIngredients;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/ingredients');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.query().subscribe(ingredients => {
        expect(ingredients.length).toBe(2);
        expect(ingredients).toContain(response[0]);
        expect(ingredients).toContain(response[1]);
      });

    }));

    /**
    * /GET ingredients/1
    */
    it('should /GET a single ingredient', inject([IngredientService], (service: IngredientService) => {

      let response = mockIngredients[0];

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/ingredients/1');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.get(1).subscribe(ingredients => {
        expect(ingredients).toEqual(response);
      });

    }));

    /**
    * /GET ingredients/applications
    */
    it('should /GET all ingredients that are applications', inject([IngredientService], (service: IngredientService) => {

      let response = mockIngredients;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/applications');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.applications().subscribe(ingredients => {
        expect(ingredients.length).toBe(2);
        expect(ingredients).toContain(response[0]);
        expect(ingredients).toEqual(response);
      });

    }));

    /**
    * /GET ingredients/templates
    */
    it('should /GET all ingredients that are templates', inject([IngredientService], (service: IngredientService) => {

      let response = mockIngredients;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/templates');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.templates().subscribe(ingredients => {
        expect(ingredients.length).toBe(2);
        expect(ingredients).toContain(response[0]);
        expect(ingredients).toEqual(response);
      });

    }));

    /**
    * /GET ingredients/templates
    */
    it('should /GET all recommendations for a specific ingredient', inject([IngredientService], (service: IngredientService) => {

      let response = mockIngredients;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/ingredients/1/recommendations');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.recommendations(1).subscribe(recommendations => {
        expect(recommendations.length).toBe(2);
        expect(recommendations).toContain(response[0]);
        expect(recommendations).toEqual(response);
      });

    }));

    /**
    * /GET ingredients/1/copy
    */
    it('should /GET a copy of the ingredient', inject([IngredientService], (service: IngredientService) => {

      let response = mockIngredients;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/ingredients/1/copy');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.copy(1).subscribe(copiedIngredient => {
        expect(copiedIngredient).toEqual(response);
      });

    }));

    /**
    * /GET ingredients/1/trigger_recommendation
    */
    it('should trigger a new recommendation', inject([IngredientService], (service: IngredientService) => {

      let response = {id: 1};

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/ingredients/1/trigger_recommendation');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.triggerRecommendation(1).subscribe(job => {
        expect(job).toEqual(response);
      });

    }));

    /**
    * /GET ingredients/templates
    */
    it('should instantiate a new application from a template', inject([IngredientService], (service: IngredientService) => {

      let response = mockIngredients;

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url).toContain('/ingredients/1/instance');
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: JSON.stringify(response)})));
      });

      service.instantiate(1).subscribe(instance => {
        expect(instance).toEqual(response);
      });

    }));

});
