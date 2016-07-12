import {Component} from '@angular/core';
import {OnActivate, RouteSegment, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {JobService} from '../services/job';

import {Recommendation} from '../dtos/recommendation.dto';
import {TimerWrapper} from '@angular/core/src/facade/async';

import {SumMonthlyPipe} from './sumMonthly.pipe';
import {SumHourlyPipe} from './sumHourly.pipe';

import {LoadingComponent} from '../shared/loading.component';

@Component({
    template: require('./recommendation-detail.component.html'),
    styles: [require('./recommendation-detail.component.scss')],
    directives: [ROUTER_DIRECTIVES, LoadingComponent],
    pipes: [SumMonthlyPipe, SumHourlyPipe]
})

export class RecommendationDetailComponent implements OnActivate {

    private applicationId: number;
    public recommendation: Recommendation;

    public recommendationNotFound: boolean;
    public generatingRecommendation: boolean;

    constructor(private _ingredientService: IngredientService, private _jobService: JobService) {
    }

    routerOnActivate(curr: RouteSegment): void {
        let id = parseInt(curr.getParam('id'), null);
        this.applicationId = id;
        this.loadRecommendation(id);
    }

    loadRecommendation(id: number) {

    }

    triggerRecommendation() {
      this.generatingRecommendation = true;
      this._ingredientService.triggerRecommendation(this.applicationId).subscribe(
        result => {
          let jobUUID = result.job_id;
          this.fetchJobStatus(jobUUID);
        },
        error => console.log(error)
      );
    }

    fetchJobStatus(uuid: string) {
      this._jobService.get(uuid, null).subscribe(jobResult => {
        if (jobResult.delayed_job.attempts === 1) {
          this.loadRecommendation(this.applicationId);
        } else {
          TimerWrapper.setTimeout(() => {
            this.fetchJobStatus(uuid);
          }, 5000);
        }
      }, error => {
        this.loadRecommendation(this.applicationId);
      });
    }

}
