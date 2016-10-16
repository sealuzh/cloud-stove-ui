import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RequestService } from './services/request.service';
import { ConfigService } from './services/config.service';
import { IngredientService } from './services/ingredient.service';
import { ConstraintService } from './services/constraint.service';
import { CPUWorkloadService } from './services/cpu-workload.service';
import { RAMWorkloadService } from './services/ram-workload.service';
import { TrafficWorkloadService } from './services/traffic-workload.service';
import { UserWorkloadService } from './services/user-workload.service';
import { RecommendationService } from './services/recommendation.service';
import { JobService } from './services/job.service';

@NgModule({
  imports: [
    BrowserModule,
  ],
  providers: [
    ConfigService,
    IngredientService,
    RequestService,
    ConstraintService,
    RecommendationService,
    RAMWorkloadService,
    CPUWorkloadService,
    TrafficWorkloadService,
    UserWorkloadService,
    JobService
  ]
})

export class ApiModule { }
