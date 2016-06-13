import {RestObject} from './restobject.dto';

export interface Job extends RestObject {
    uuid: string;
    job_type: string;
    delayed_job: {
        id: number,
        priority: number,
        attempts: number,
        handler: string,
        last_error: string,
        run_at: Date,
        locked_at: Date,
        failed_at: Date,
        locked_by: string,
        queue: string,
        created_at: Date,
        updated_at: Date
    };
}
