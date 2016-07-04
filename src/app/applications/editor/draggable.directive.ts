import {OnInit, ElementRef, Directive, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[csDraggable]'
})

export class DraggableDirective implements OnInit {

  mousedrag;

  height: number;
  width: number;

  mouseup   = new EventEmitter();
  mousedown = new EventEmitter();
  mousemove = new EventEmitter();

  @HostListener('mousedown', ['$event'])
  onMousedown(event) { this.mousedown.emit(event); }

  // we have to track global mousemove and mouseup, as the cursor can move
  // outside the draggable element
  @HostListener('document:mousemove', ['$event'])
  onMousemove(event) { this.mousemove.emit(event); }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) { this.mouseup.emit(event); }

  constructor(public element: ElementRef) {
    this.element.nativeElement.style.cursor = 'pointer';

    this.mousedrag = this.mousedown.map((event: MouseEvent) => {
      event.preventDefault();
      return {
        top: this.element.nativeElement.parentElement.getBoundingClientRect().top,
        left: this.element.nativeElement.parentElement.getBoundingClientRect().left
      };
    }).flatMap(imageOffset => this.mousemove.map((event: MouseEvent) => {
      return {
        top:  event.clientY - imageOffset.top - (this.height / 2),
        left: event.clientX - imageOffset.left - (this.width / 2),
      };
    }).takeUntil(this.mouseup));

  }

  ngOnInit() {

    this.height = this.element.nativeElement.offsetHeight;
    this.width = this.element.nativeElement.offsetWidth;

    this.mousedrag.subscribe(pos => {
        this.element.nativeElement.style.top  = pos.top  + 'px';
        this.element.nativeElement.style.left = pos.left + 'px';
    });
  }

}
