import {RestObject} from './../restobject.dto';

export interface UserWorkload extends RestObject {
    num_simultaneous_users?: number;
}
