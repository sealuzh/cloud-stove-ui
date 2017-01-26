/**
 * @module RecommendationsModule
 * @preferred
 *
 * This module provides users with all information regarding their generated recommendations. Users can generate recommendations, delete them, and get visualized
 * representations as graphs.
 * 
 * ![alt text](media://recommendation-detail.PNG "Recommendation Detail View")
 * 
 */ /** */
 
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';
import { ApiModule } from '../api/api.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NouisliderModule } from 'ng2-nouislider';

import { routing } from './recommendations.routes';

import { DropdownModule } from 'ng2-bootstrap/components/dropdown';
import { ModalModule } from 'ng2-bootstrap/components/modal';

import { RecommendationDetailComponent } from './recommendation-detail.component';
import { RecommendationListComponent } from './recommendation-list.component';
import { RecommendationComponent } from './recommendation.component';
import { RecommendationDistributionChartComponent } from './charts/distribution-chart.component';
import { RecommendationSensitivityChartComponent } from './charts/sensitivity-chart.component';

import { UserWorkloadSliderComponent } from './user-workload.component';

import { TimeAgoPipe } from 'angular2-moment';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    ApiModule,
    DropdownModule,
    ModalModule,
    FormsModule,
    ChartsModule,
    NouisliderModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    RecommendationDetailComponent,
    RecommendationListComponent,
    RecommendationComponent,
    RecommendationDistributionChartComponent,
    RecommendationSensitivityChartComponent,
    UserWorkloadSliderComponent,
    TimeAgoPipe
  ]
})

export class RecommendationsModule { }
