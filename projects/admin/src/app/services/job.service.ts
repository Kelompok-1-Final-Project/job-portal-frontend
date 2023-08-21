import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { JobGetResDto } from "@dto/job/job.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { JobStatusGetResDto } from "@dto/job/job-status.get.res.dto";
import { EmploymentTypeGetResDto } from "@dto/job/employment-type.get.res.dto";
import { JobPositionGetResDto } from "@dto/job/job-position.get.res.dto";
import { JobInsertReqDto } from "@dto/job/job.insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private base: BaseService) { }

    getAll(): Observable<JobGetResDto[]> {
        return this.base.get<JobGetResDto[]>(`${BASE_URL}/jobs`, true)
    }

    getStatus(): Observable<JobStatusGetResDto[]> {
        return this.base.get<JobStatusGetResDto[]>(`${BASE_URL}/jobs/job-status`, true)
    }

    getEmploymentType(): Observable<EmploymentTypeGetResDto[]> {
        return this.base.get<EmploymentTypeGetResDto[]>(`${BASE_URL}/jobs/employment-type`, true)
    }

    getJobPosition(): Observable<JobPositionGetResDto[]> {
        return this.base.get<JobPositionGetResDto[]>(`${BASE_URL}/jobs/job-position`, true)
    }

    getById(param: string): Observable<JobGetResDto> {
        return this.base.get<JobGetResDto>(`${BASE_URL}/jobs/filter?jobId=${param}`, true)
    }

    insertJob(data: JobInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/jobs`, data, true)
    }
}