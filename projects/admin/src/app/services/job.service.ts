import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "@constant/api.constant";
import { JobStatusGetResDto } from "@dto/job/job-status.get.res.dto";
import { EmploymentTypeGetResDto } from "@dto/job/employment-type.get.res.dto";
import { JobPositionGetResDto } from "@dto/job/job-position.get.res.dto";
import { JobInsertReqDto } from "@dto/job/job.insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";
import { JobAdminGetResDto } from "@dto/job/job-admin.get.res.dto";
import { JobUpdateReqDto } from "@dto/job/job.update.req.dto";
import { UpdateResDto } from "@dto/update.res.dto";
import { DeleteResDto } from "@dto/delete.res.dto";
import { SkillTestInsertReqDto } from "@dto/skilltest/skill-test.insert.req.dto";
import { SkillTestQuestionInsertReqDto } from "@dto/skilltest/skill-test-question.insert.req.dto";
import { JobBenefitGetResDto } from "@dto/job-benefit/job-benefit.get.res.dto";
import { JobBenefitReqDto } from "@dto/job-benefit/job-benefit.req.dto";

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private base: BaseService) { }

    getAll(): Observable<JobAdminGetResDto[]> {
        return this.base.get<JobAdminGetResDto[]>(`${BASE_URL}/jobs`, true)
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

    getById(param: string): Observable<JobAdminGetResDto> {
        return this.base.get<JobAdminGetResDto>(`${BASE_URL}/jobs/filter?jobId=${param}`, true)
    }

    insertJob(data: JobInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/jobs`, data, true)
    }

    update(data: JobUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/jobs`, data, true)
    }

    deleteQuestion(skillTest: string, question: string): Observable<DeleteResDto> {
        return this.base.delete<DeleteResDto>(`${BASE_URL}/skilltests/${skillTest}/${question}`, true)
    }

    insertJobQuestion(data: SkillTestQuestionInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/skilltests/question`, data, true)
    }

    getJobBenefit(param: string): Observable<JobBenefitGetResDto[]> {
        return this.base.get<JobBenefitGetResDto[]>(`${BASE_URL}/jobs/job-benefit?job=${param}`, true)
    }

    deleteJobBenefit(job: string, benefit: string): Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL}/jobs/${job}/${benefit}`, true)
    }

    insertJobBenefit(data: JobBenefitReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/jobs/job-benefit`, data, true)
    }
}