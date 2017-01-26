/**
 * @module SharedModule
 */ /** */
 
import { Pipe, PipeTransform } from '@angular/core';
import { Resource } from '../../api/dtos/resource.dto';
import { Ingredient } from '../../api/dtos/ingredient.dto';

@Pipe({name: 'csSumMonthly'})

export class SumMonthlyPipe implements PipeTransform {
  transform(value: {ingredient: Ingredient, resource: Resource, resource_count: number}[]): number {
    let monthlyCosts = 0;

    for (let recommendation of value) {
      monthlyCosts += recommendation.resource_count * recommendation.resource.price_per_month;
    }

    return Math.round(monthlyCosts * 100) / 100;
  }
}
