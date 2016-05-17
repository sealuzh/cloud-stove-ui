import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes, Router } from '@angular/router';
import { SidebarComponent } from './sidebar';
import { WelcomeComponent } from './welcome';

@Component({
  moduleId: module.id,
  selector: 'cloudstove-ui-app',
  templateUrl: 'cloudstove-ui.component.html',
  styleUrls: ['cloudstove-ui.component.css'],
  directives: [SidebarComponent, ROUTER_DIRECTIVES]
})

@Routes([
  {path: '/welcome', component: WelcomeComponent},
])

export class CloudstoveUiAppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/welcome']);
  }
}
