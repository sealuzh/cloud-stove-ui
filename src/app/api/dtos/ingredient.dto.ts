/**
 * @module ApiModule
 */ /** */

import {Constraint} from './constraint.dto';
import {Resource} from './resource.dto';
import {RestObject} from './restobject.dto';
import {CPUWorkload} from './workload/cpu-workload.dto';
import {RAMWorkload} from './workload/ram-workload.dto';
import {UserWorkload} from './workload/user-workload.dto';
import {ScalingWorkload} from './workload/scaling-workload.dto';

export interface Ingredient extends RestObject {
    name: string;
    body?: string;
    icon?: string;
    parent_id?: number;
    template_id?: number;
    is_template?: boolean;
    recommendation?: Resource;
    constraints?: Constraint[];
    workloads?: {ram_workload?: RAMWorkload, cpu_workload?: CPUWorkload, user_workload?: UserWorkload, scaling_workload?: ScalingWorkload};
    children?: Ingredient[];
}
