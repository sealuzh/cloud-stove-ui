import {Input, ContentChildren, AfterContentInit, ElementRef, Directive, QueryList} from '@angular/core';

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

  constructor(public element: ElementRef) {

  }

  ngAfterContentInit() {
    this.drawConstraints();
  }

  drawConstraints() {
    for (let comp of this.constraints.toArray()) {
      let constraint: any = comp.constraint;
      console.log(constraint);
    }
  }

}
