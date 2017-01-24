/**
 * @module SharedModule
 */ /** */
 
import { OnInit, Directive, ElementRef, Input } from '@angular/core';
import * as Showdown from 'showdown';

@Directive({
  selector: '[csMarkdown]'
})

export class MarkdownDirective implements OnInit {

  @Input()
  public src: string;

  @Input()
  public data: string;

  private element: Element;

  constructor (elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit () {
    // element with 'data' attribute set
    if (this.data) {
      this.fromData(this.data);
    }
    // element containing markdown
    if (!this.src) {
      this.fromRAW();
    }
  }

  private fromData(data) {
    let raw = data;
    let html = this.process(this.prepare(raw));
    this.element.innerHTML = html;
  }

  private fromRAW() {
    let raw = this.element.innerHTML;
    let html = this.process(this.prepare(raw));
    this.element.innerHTML = html;
  }

  private prepare(raw) {
    return raw.split('\n').map((line) => line.trim()).join('\n');
  }

  private process(markdown) {
    let converter = new Showdown.Converter;
    return converter.makeHtml(markdown);
  }

}
