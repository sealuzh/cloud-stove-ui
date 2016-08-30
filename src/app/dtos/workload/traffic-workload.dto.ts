import {RestObject} from './../restobject.dto';

export interface TrafficWorkload extends RestObject {
  ingredient_id: number;
  visits_per_month?: number;
  requests_per_vists?: number;
  request_size_kb?: number;
}
