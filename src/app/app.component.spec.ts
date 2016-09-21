import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';

import {AppComponent} from '../app/app.component';
import {AuthService} from '../app/services/auth';
import {Router} from '@angular/router';
import {provide, ViewContainerRef} from '@angular/core';

beforeEachProviders(() => [
      AppComponent,
      provide(Router, {useValue: jasmine.createSpyObj('Router', ['navigate'])}),
      provide(ViewContainerRef, {useValue: jasmine.createSpyObj('ViewContainerRef', [''])}),
      provide(AuthService, {useValue: jasmine.createSpyObj('AuthService', [''])})
    ]
);

describe('App: CloudstoveUi', () => {
    it('should create the app',
        inject([AppComponent, Router, ViewContainerRef, AuthService], (app:AppComponent) => {
            expect(app).toBeTruthy();
        }));
});
