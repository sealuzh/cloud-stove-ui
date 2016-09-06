import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import {IngredientService} from '../services/ingredient';
import {RecommendationService} from '../services/recommendation';
import {ConstraintService} from '../services/constraint';

import {Recommendation} from '../dtos/recommendation.dto';
import {Ingredient} from '../dtos/ingredient.dto';
import {Constraint} from '../dtos/constraint.dto';

import {SumMonthlyPipe} from './sumMonthly.pipe';
import {SumHourlyPipe} from './sumHourly.pipe';

import {LoadingComponent} from '../shared/loading.component';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap';
import {UserWorkloadSliderComponent} from '../workload/user-workload.component';
import {RecommendationDetailComponent} from './recommendation-detail.component';

import {RecommendationDistributionChartComponent} from './charts/distribution-chart.component';
import {RecommendationSensitivityChartComponent} from './charts/sensitivity-chart.component';

@Component({
    template: require('./recommendation.component.html'),
    styles: [require('./recommendation.component.less')],
    directives: [
        ROUTER_DIRECTIVES,
        DROPDOWN_DIRECTIVES,
        UserWorkloadSliderComponent,
        LoadingComponent,
        RecommendationDetailComponent,
        RecommendationDistributionChartComponent,
        RecommendationSensitivityChartComponent
    ],
    pipes: [SumMonthlyPipe, SumHourlyPipe]
})

export class RecommendationComponent implements OnInit {

    public application: Ingredient;
    public recommendations: Recommendation[];
    public generatingRecommendation: boolean = false;

    public status: { regionIsOpen: boolean, providerIsOpen: boolean } = { regionIsOpen: false, providerIsOpen: false };
    recommendationOptions: { region: string } = { region: 'EU' };

    public regionConstraint: Constraint = { type: 'PreferredRegionAreaConstraint', preferred_region_area: null };
    public providerConstraint: Constraint = { type: 'ProviderConstraint', preferred_providers: [] };
    public selectableRegions: {id: string, name: string}[] = [
      {id: 'US', name: 'United States'},
      {id: 'EU', name: 'Europe'},
      {id: 'ASIA', name: 'Asia-Pacific'},
      {id: 'SA', name: 'South America'}
    ];

    public selectableProviders: string[] = ['Google', 'Microsoft Azure', 'Digital Ocean', 'Atlantic.net', 'Amazon', 'Rackspace'];

    constructor(
      private _ingredientService: IngredientService,
      private _constraintService: ConstraintService,
      private _recommendationService: RecommendationService,
      private _route: ActivatedRoute) {

    }

    ngOnInit(): void {
      this._route.params.subscribe(params => {
        let applicationId = +params['id'];
        this.loadRecommendation(applicationId);
      });
    }

    loadRecommendation(applicationId: number) {
      this._ingredientService.get(applicationId).subscribe(result => {
        this.application = result;

        // get application constraints
        for (let constraint of this.application.constraints) {
          if (constraint.type === 'PreferredRegionAreaConstraint') {
            this.regionConstraint = constraint;
          }

          if (constraint.type === 'ProviderConstraint') {
            this.providerConstraint = constraint;
          }
        }

        // fetch recommendations
        this._ingredientService.recommendations(applicationId).subscribe(
          result => {
            this.recommendations = result.sort((a, b) => { return new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); }).reverse();
          }, error => console.log(error)
        );

      }, error => console.log(error));
    }

    triggerRecommendation() {
      this.generatingRecommendation = true;
      this._recommendationService.get(this.application.id).subscribe(
        result => {
          this.recommendations = result.sort((a, b) => { return new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); }).reverse();
          this.generatingRecommendation = false;
        },
        error => {
          console.log(error);
          this.generatingRecommendation = false;
        }
      );
    }

    changeRegion(region: string) {
      this.regionConstraint.ingredient_id = this.application.id;
      this.regionConstraint.preferred_region_area = region;
      this._constraintService.save(this.regionConstraint).subscribe(
        result => this.regionConstraint = result,
        error => console.log(error)
      );
    }

    selectProvider(provider: string) {
      this.providerConstraint.ingredient_id = this.application.id;

      if (this.providerConstraint.preferred_providers.indexOf(provider) > -1) {
        this.providerConstraint.preferred_providers.splice(this.providerConstraint.preferred_providers.indexOf(provider), 1);
      } else {
        this.providerConstraint.preferred_providers.push(provider);
      }

      this._constraintService.save(this.providerConstraint).subscribe(
        result => this.providerConstraint = result,
        error => console.log(error)
      );
    }

}
