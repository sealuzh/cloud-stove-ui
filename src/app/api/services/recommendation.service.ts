import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { Recommendation } from '../dtos/recommendation.dto';

import { JobService } from './job.service';
import { IngredientService } from './ingredient.service';

import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import { RestService } from './rest.service';
import { RequestService } from './request.service';

@Injectable()
export class RecommendationService extends RestService {

    constructor(private _ingredientService: IngredientService, private _jobService: JobService,  http: Http, configs: ConfigService, request: RequestService, router: Router) {
        super(http, configs, 'recommendation', request, null, router);
    }

    get(ingredientId: number): Observable<Recommendation[]> {
        return Observable.create(subscriber => {
          // first, trigger the job to generate the recommendation
          this._ingredientService.triggerRecommendation(ingredientId).subscribe(
            result => {
              let jobUUID = result.job_id;
              // job has been accepted, fetch its result
              this.fetchJobStatus(jobUUID, ingredientId, subscriber);
            },
            error => console.log(error)
          );

        });
    }

    triggerRange(ingredientId: number, min: number, max: number, step: number): Observable<Recommendation[]> {
      return Observable.create(subscriber => {
          // first, trigger the job to generate the recommendation
          this._ingredientService.triggerRangeRecommendation(ingredientId, min, max, step).subscribe(
            result => {
              this.fetchRangeJobStatus(ingredientId, subscriber);
            },
            error => console.log(error)
          );

        });
    }

    private fetchRangeJobStatus(ingredientId: number, subscription: Subscriber<Recommendation[]>) {
      this._ingredientService.recommendationsCompleted(ingredientId).subscribe(recommendationComplete => {
        if (recommendationComplete) {
          this.fetchRecommendation(ingredientId, subscription);
        } else {
          setTimeout(() => {
            this.fetchRangeJobStatus(ingredientId, subscription);
          }, 2500);
        }
      }, error => {
        console.error(error);
      });
    }

    private fetchJobStatus(uuid: string, ingredientId: number, subscription: Subscriber<Recommendation[]>) {
      this._jobService.get(uuid).subscribe(jobResult => {
        if (jobResult.delayed_job.attempts === 1) {
          this.fetchRecommendation(ingredientId, subscription);
        } else {
          setTimeout(() => {
            this.fetchJobStatus(uuid, ingredientId, subscription);
          }, 2500);
        }
      }, error => {
        this.fetchRecommendation(ingredientId, subscription);
      });
    }

    private fetchRecommendation(ingredientId: number, subscription: Subscriber<Recommendation[]>) {
      this._ingredientService.recommendations(ingredientId).subscribe(
          recommendations => {
            subscription.next(recommendations);
            subscription.complete();
          }, error => {
            console.log(error);
          }
      );
    }

}
