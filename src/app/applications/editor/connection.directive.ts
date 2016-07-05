import {Input, ContentChildren, AfterContentInit, ElementRef, Directive, QueryList, HostListener} from '@angular/core';

import {Ingredient} from '../../dtos/ingredient.dto';
import {Constraint} from '../../dtos/constraint.dto';

import {StoveEditorIngredientComponent} from '../application-editor-ingredient.component';
import {StoveEditorDependencyConstraintComponent} from '../application-editor-constraint.component';

@Directive({
  selector: '[csConnection]',
})

export class ConnectionDirective implements AfterContentInit {

  @Input('csConnection') application: Ingredient;

  @ContentChildren(StoveEditorIngredientComponent) ingredients: QueryList<StoveEditorIngredientComponent>;
  @ContentChildren(StoveEditorDependencyConstraintComponent) constraints: QueryList<StoveEditorDependencyConstraintComponent>;

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event) { this.drawConstraints(); }

  constructor(public element: ElementRef) {

  }

  ngAfterContentInit() {
    this.drawConstraints();
  }

  drawConstraints() {
    for (let comp of this.constraints.toArray()) {
      let constraint: any = comp.constraint;

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

}
