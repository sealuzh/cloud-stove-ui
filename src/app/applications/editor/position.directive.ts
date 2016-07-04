import {Input, OnInit, ElementRef, Directive} from '@angular/core';

@Directive({
  selector: '[csPosition]',
})

export class PositionDirective implements OnInit {

  @Input('csPosition') position: number;

  constructor(public element: ElementRef) {

  }

  ngOnInit() {
    this.element.nativeElement.style.top  = Math.floor(this.position / 3) * 220  + 'px';
    this.element.nativeElement.style.left = (this.position % 3) * 320  + 'px';
  }

}
