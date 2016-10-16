import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IngredientService } from '../api/services/ingredient.service';
import { RecommendationService } from '../api/services/recommendation.service';
import { ConstraintService } from '../api/services/constraint.service';

import { Recommendation } from '../api/dtos/recommendation.dto';
import { Ingredient } from '../api/dtos/ingredient.dto';
import { Constraint } from '../api/dtos/constraint.dto';

@Component({
    template: require('./recommendation.component.html'),
    styles: [require('./recommendation.component.less')]
})

export class RecommendationComponent implements OnInit {

    public application: Ingredient;
    public selectedRecommendation: Recommendation;
    public recommendations: Recommendation[];
    public generatingRecommendation: boolean = false;

    public status: { regionIsOpen: boolean, providerIsOpen: boolean } = { regionIsOpen: false, providerIsOpen: false };
    public recommendationOptions: { region: string } = { region: 'EU' };

    public regionConstraint: Constraint = { type: 'PreferredRegionAreaConstraint', preferred_region_area: null };
    public providerConstraint: Constraint = { type: 'ProviderConstraint', preferred_providers: [] };
    public selectableRegions: {id: string, name: string}[] = [
      {id: 'US', name: 'United States'},
      {id: 'EU', name: 'Europe'},
      {id: 'ASIA', name: 'Asia-Pacific'},
      {id: 'SA', name: 'South America'}
    ];

    public selectableProviders: string[] = ['Google', 'Microsoft Azure', 'Digital Ocean', 'Atlantic.net', 'Amazon', 'Rackspace', 'Joyent'];

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
            this.selectedRecommendation = this.recommendations[0];
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

    removeRecommendation(recommendation: Recommendation) {
      this._recommendationService.delete(recommendation).subscribe(
        result => this.recommendations.splice(this.recommendations.indexOf(recommendation), 1),
        error => console.log(error)
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
