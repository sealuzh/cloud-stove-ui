/**
 * @module ApplicationsModule
 */ /** */

import {Input, OnInit, ElementRef, Directive} from '@angular/core';

@Directive({
  selector: '[csPosition]',
})

export class PositionDirective implements OnInit {

  @Input() csPosition: number;

  constructor(public element: ElementRef) {

  }

  ngOnInit() {
    let left = (this.csPosition % 3) * 320 + 10;
    let top = Math.floor(this.csPosition / 3) * 220 + 10;
    this.element.nativeElement.style.transform = 'translate3d(' + left + 'px,' + top + 'px, 0)';
    this.element.nativeElement.editorPosition = { left: left, top: top };
  }

}
