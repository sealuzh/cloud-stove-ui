import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { CloudstoveUiAppComponent } from '../app/cloudstove-ui.component';

beforeEachProviders(() => [CloudstoveUiAppComponent]);

describe('App: CloudstoveUi', () => {
  it('should create the app',
      inject([CloudstoveUiAppComponent], (app: CloudstoveUiAppComponent) => {
    expect(app).toBeTruthy();
  }));
});
