import {RestObject} from './../restobject.dto';

export interface RAMWorkload extends RestObject {
  ingredient_id?: number;
  ram_mb_required?: number;
  ram_mb_growth_per_user?: number;
  ram_mb_required_user_capacity?: number;
}
