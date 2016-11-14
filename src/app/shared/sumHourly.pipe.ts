import { Pipe, PipeTransform } from '@angular/core';
import { Resource } from '../api/dtos/resource.dto';
import { Ingredient } from '../api/dtos/ingredient.dto';

@Pipe({name: 'csSumHourly'})
export class SumHourlyPipe implements PipeTransform {
  transform(value: {ingredient: Ingredient, resource: Resource, resource_count: number}[]): number {
    let hourlyCosts = 0;
    for (let recommendation of value) {
      hourlyCosts += recommendation.resource_count * recommendation.resource.price_per_hour;
    }
    return Math.round(hourlyCosts * 100) / 100;
  }
}
