import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
    it,
    inject,
} from '@angular/core/testing';
import {ComponentFixture, TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {SidebarComponent} from './sidebar.component';
import {Router} from '@angular/router';
import {provide} from '@angular/core';

describe('Component: Sidebar', () => {
    let builder:TestComponentBuilder;

    beforeEachProviders(() => [
        SidebarComponent,
        provide(Router, {useValue: jasmine.createSpyObj('Router', ['navigate'])})
    ]);
    
    beforeEach(inject([TestComponentBuilder], function (tcb:TestComponentBuilder) {
        builder = tcb;
    }));

    it('should inject the component', inject([SidebarComponent, Router],
        (component:SidebarComponent) => {
            expect(component).toBeTruthy();
        }));
});

@Component({
    selector: 'test',
    template: `
    <hb-sidebar></hb-sidebar>
  `,
    directives: [SidebarComponent]
})
class SidebarComponentTestController {
}
