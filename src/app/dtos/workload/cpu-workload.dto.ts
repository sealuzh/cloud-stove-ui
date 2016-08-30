import {RestObject} from './../restobject.dto';

export interface CPUWorkload extends RestObject {
    ingredient_id?: number;
    cspu_user_capacity?: number;
    parallelism?: number;
}
