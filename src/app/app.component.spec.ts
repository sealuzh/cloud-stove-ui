import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';

import {AppComponent} from '../app/app.component';
import {Router} from '@angular/router';
import {provide} from '@angular/core';

beforeEachProviders(() => [
    AppComponent,
        provide(Router, {useValue: jasmine.createSpyObj('Router', ['navigate'])})
    ]
);

describe('App: CloudstoveUi', () => {
    it('should create the app',
        inject([AppComponent, Router], (app:AppComponent) => {
            expect(app).toBeTruthy();
        }));
});
