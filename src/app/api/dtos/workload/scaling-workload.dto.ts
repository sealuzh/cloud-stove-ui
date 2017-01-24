/**
 * @module ApiModule
 */ /** */

import {RestObject} from './../restobject.dto';

export interface ScalingWorkload extends RestObject {
    ingredient_id?: number;
    scale_ingredient?: boolean;
}
