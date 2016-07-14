import {Injectable} from '@angular/core';
import {Observable, Subscriber} from 'rxjs/Rx';
import {TimerWrapper} from '@angular/core/src/facade/async';

import {Ingredient} from '../dtos/ingredient.dto';
import {Recommendation} from '../dtos/recommendation.dto';

import {JobService} from './job';
import {IngredientService} from './ingredient';

@Injectable()
export class RecommendationService {

    constructor(private _ingredientService: IngredientService, private _jobService: JobService) {

    }

    loadRecommendation(ingredient: Ingredient): Observable<Recommendation[]> {
        return Observable.create(subscriber => {
          // first, trigger the job to generate the recommendation
          this._ingredientService.triggerRecommendation(ingredient.id).subscribe(
            result => {
              let jobUUID = result.job_id;
              // job has been accepted, fetch its result
              this.fetchJobStatus(jobUUID, ingredient, subscriber);
            },
            error => console.log(error)
          );

        });
    }

    private fetchJobStatus(uuid: string, ingredient: Ingredient, subscription: Subscriber<Recommendation[]>) {
      this._jobService.get(uuid, null).subscribe(jobResult => {
        if (jobResult.delayed_job.attempts === 1) {
          this.fetchRecommendation(ingredient, subscription);
        } else {
          TimerWrapper.setTimeout(() => {
            this.fetchJobStatus(uuid, ingredient, subscription);
          }, 2500);
        }
      }, error => {
        this.fetchRecommendation(ingredient, subscription);
      });
    }

    private fetchRecommendation(ingredient: Ingredient, subscription: Subscriber<Recommendation[]>) {
      this._ingredientService.recommendations(ingredient.id).subscribe(
          recommendations => {
            subscription.next(recommendations);
            subscription.complete();
          }, error => {
            console.log(error);
          }
      );
    }

}
