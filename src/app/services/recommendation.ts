import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {TimerWrapper} from '@angular/core/src/facade/async';

import {Ingredient} from '../dtos/ingredient.dto';
import {Recommendation} from '../dtos/recommendation.dto';

import {JobService} from './job';
import {IngredientService} from './ingredient';

@Injectable()
export class RecommendationService {

    constructor(private _ingredientService: IngredientService, private _jobService: JobService) {

    }

    loadRecommendation(id: number): Observable<Recommendation> {
        let observable = Observable.create(observer => {
          this._ingredientService.recommendation(id).subscribe(
              recommendation => {
                observer.onNext(recommendation);
                observer.onCompleted();
              }, error => {
                this.triggerRecommendation(id)
              }
          );
        });
    }

    private triggerRecommendation(application: Ingredient) {
      return this._ingredientService.triggerRecommendation(application.id).subscribe(
        result => {
          let jobUUID = result.job_id;
          this.fetchJobStatus(jobUUID, application);
        },
        error => console.log(error)
      );
    }

    private fetchJobStatus(uuid: string, application: Ingredient) {
      this._jobService.get(uuid, null).subscribe(jobResult => {
        if (jobResult.delayed_job.attempts === 1) {
          this.loadRecommendation(application.id);
        } else {
          TimerWrapper.setTimeout(() => {
            this.fetchJobStatus(uuid, application);
          }, 5000);
        }
      }, error => {
        this.loadRecommendation(application.id);
      });
    }


}
