import {RestObject} from './restobject.dto';

export interface Workload extends RestObject {
    ram_mb_required?: number;
    ram_mb_growth_per_user?: number;
    cspu_user_capacity?: number;
    cspu_slope?: number;
    visits_per_month?: number;
    requests_per_vists?: number;
    request_size_kb?: number;
}
