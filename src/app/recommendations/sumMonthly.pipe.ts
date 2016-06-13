import {Pipe, PipeTransform} from '@angular/core';
import {Resource} from '../dtos/resource.dto';
import {Ingredient} from '../dtos/ingredient.dto';

@Pipe({name: 'csSumMonthly'})
export class SumMonthlyPipe implements PipeTransform {
  transform(value: {ingredient: Ingredient, resource: Resource}[]): number {
    let monthlyCosts = 0;
    for (let recommendation of value) {
      monthlyCosts += parseFloat(recommendation.resource.price_per_month);
    }
    return Math.round(monthlyCosts * 100) / 100;
  }
}