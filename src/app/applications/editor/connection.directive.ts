import {Input, ContentChildren, AfterContentInit, ElementRef, Directive, QueryList, HostListener, EventEmitter, OnInit} from '@angular/core';

import {Ingredient} from '../../dtos/ingredient.dto';
import {Constraint} from '../../dtos/constraint.dto';

import {StoveEditorIngredientComponent} from '../application-editor-ingredient.component';
import {StoveEditorDependencyConstraintComponent} from '../application-editor-constraint.component';

@Directive({
  selector: '[csConnection]',
})

export class ConnectionDirective implements AfterContentInit, OnInit {

  @Input('csConnection') application: Ingredient;

  @ContentChildren(StoveEditorIngredientComponent) ingredients: QueryList<StoveEditorIngredientComponent>;
  @ContentChildren(StoveEditorDependencyConstraintComponent) constraints: QueryList<StoveEditorDependencyConstraintComponent>;

  mousedrag;

  mouseup   = new EventEmitter();
  mousedown = new EventEmitter();
  mousemove = new EventEmitter();

  @HostListener('mousedown', ['$event'])
  onMousedown(event) { this.mousedown.emit(event); }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event) { this.mousemove.emit(event); }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) { this.mouseup.emit(event); }

  constructor(public element: ElementRef) {
    this.mousedrag = this.mousedown.map((event: MouseEvent) => {
      event.preventDefault();
      return;
    }).flatMap(() => this.mousemove.map((event: MouseEvent) => {
      return;
    }).takeUntil(this.mouseup));
  }

  ngAfterContentInit() {
    this.drawConstraints();
  }

  drawConstraints() {
    for (let comp of this.constraints.toArray()) {
      let constraint: Constraint = comp.constraint;

      let sources = this.ingredients.filter(comp => comp.ingredient.id === constraint.source_id);
      let targets = this.ingredients.filter(comp => comp.ingredient.id === constraint.target_id);

      if (sources.length > 0 && targets.length > 0) {
        let sourceIngredient = sources[0].element.nativeElement;
        let targetIngredient = targets[0].element.nativeElement;

        comp.updateConstraint(
          sourceIngredient.offsetLeft + sourceIngredient.clientWidth / 2,
          sourceIngredient.offsetTop + sourceIngredient.clientHeight / 2,
          targetIngredient.offsetLeft + targetIngredient.clientWidth / 2,
          targetIngredient.offsetTop + sourceIngredient.clientHeight / 2
        );
      }
    }
  }

  ngOnInit() {
    this.mousedrag.subscribe(() => {
        this.drawConstraints();
    });
  }

}
