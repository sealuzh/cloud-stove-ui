import {Input, OnInit, ElementRef, Directive, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[csConnection]',
  templates: `
    hello!
  `
})

export class ConnectionDirective implements OnInit {

  @Input() targetId: string;
  @Input() updateConnection: Function;

  constructor(public element: ElementRef) {

  }

  ngOnInit() {
      let target = document.getElementById(this.targetId);
  }

}
