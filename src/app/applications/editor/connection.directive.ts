import {Input, OnInit, ElementRef, Directive} from '@angular/core';

@Directive({
  selector: '[csConnection]',
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
