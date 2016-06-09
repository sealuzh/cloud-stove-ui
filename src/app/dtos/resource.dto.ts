import {RestObject} from './restobject.dto';

export interface Resource extends RestObject {
    cores: string,
    price_per_hour: number,
    price_per_month: number
}
