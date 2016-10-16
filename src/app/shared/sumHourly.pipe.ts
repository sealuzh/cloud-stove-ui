import { Pipe, PipeTransform } from '@angular/core';
import { Resource } from '../api/dtos/resource.dto';
import { Ingredient } from '../api/dtos/ingredient.dto';

@Pipe({name: 'csSumHourly'})
export class SumHourlyPipe implements PipeTransform {
  transform(value: {ingredient: Ingredient, resource: Resource}[]): number {
    let monthlyCosts = 0;
    for (let recommendation of value) {
      monthlyCosts += +recommendation.resource.price_per_hour;
    }
    return Math.round(monthlyCosts * 100) / 100;
  }
}
