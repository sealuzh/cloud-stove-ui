/**
 * @module ApiModule
 * @preferred
 * 
 * This module exposes the backend REST API of Cloud Stove. Each service roughly corresponds to one specific REST-endpoint, 
 * either providing generic REST methods on its resources like GET/PUT/POST/DELETE, or endpoint specific methods 
 * when the functionality cannot be sufficiently mapped to a RESTful interface.
 */ /** */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestService } from './services/request.service';
import { ConfigService } from './services/config.service';
import { IngredientService } from './services/ingredient.service';
import { ConstraintService } from './services/constraint.service';
import { CPUWorkloadService } from './services/cpu-workload.service';
import { RAMWorkloadService } from './services/ram-workload.service';
import { TrafficWorkloadService } from './services/traffic-workload.service';
import { UserWorkloadService } from './services/user-workload.service';
import { RecommendationService } from './services/recommendation.service';
import { ResourceService } from './services/resource.service';
import { ScalingWorkloadService } from './services/scaling-workload.service';
import { ProviderService } from './services/provider.service';
import { JobService } from './services/job.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [
    ConfigService,
    IngredientService,
    RequestService,
    ConstraintService,
    RecommendationService,
    ResourceService,
    RAMWorkloadService,
    CPUWorkloadService,
    TrafficWorkloadService,
    UserWorkloadService,
    ScalingWorkloadService,
    ProviderService,
    JobService
  ]
})

export class ApiModule { }
