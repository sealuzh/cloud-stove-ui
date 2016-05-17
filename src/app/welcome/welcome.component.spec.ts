import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { WelcomeComponent } from './welcome.component';

describe('Component: Welcome', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [WelcomeComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([WelcomeComponent],
      (component: WelcomeComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(WelcomeComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(WelcomeComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));

  /*
   it('should have as title \'Welcome to the Stove.\'',
   inject([CloudstoveUiAppComponent], (app: CloudstoveUiAppComponent) => {
   expect(app.title).toEqual('Welcome to the Stove.');
   }));
   */

});

@Component({
  selector: 'test',
  template: `
    <app-welcome></app-welcome>
  `,
  directives: [WelcomeComponent]
})
class WelcomeComponentTestController {
}

