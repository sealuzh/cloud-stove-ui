import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';

import {CloudstoveUiAppComponent} from '../app/cloudstove-ui.component';
import {Router} from '@angular/router';
import {provide} from '@angular/core';

beforeEachProviders(() => [
        CloudstoveUiAppComponent,
        provide(Router, {useValue: jasmine.createSpyObj('Router', ['navigate'])})
    ]
);

describe('App: CloudstoveUi', () => {
    it('should create the app',
        inject([CloudstoveUiAppComponent, Router], (app:CloudstoveUiAppComponent) => {
            expect(app).toBeTruthy();
        }));
});
