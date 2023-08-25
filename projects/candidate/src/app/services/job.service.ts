import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { JobGetResDto } from "@dto/job/job.get.res.dto";
import { EmploymentTypeGetResDto } from "@dto/job/employment-type.get.res.dto";
import { SaveJobInsertReqDto } from "@dto/savejob/save-job.insert.req.dto";
import { DeleteResDto } from "@dto/delete.res.dto";
import { InsertResDto } from "@dto/insert.res.dto";
import { SaveJobGetResDto } from "@dto/savejob/save-job.get.res.dto";
import { SearchJobReqDto } from "@dto/job/searchJobReqDto";
import { JobPositionGetResDto } from "@dto/job/job-position.get.res.dto";
import { BenefitGetResDto } from "@dto/benefit/benefit.get.res.dto";
import { CandidateInsertReqDto } from "@dto/candidate/candidate.insert.req.dto";
import { CandidateProgressInsertReqDto } from "@dto/candidateprogress/candidate-progress.insert.req.dto";
import { AssignJobReqDto } from "@dto/candidateprogress/candidate-assign.get.res.dto";

@Injectable({
    providedIn: 'root'
})
export class JobService{
    searchJobs!:SearchJobReqDto;
    constructor(private base: BaseService){}

    getAll(data : SearchJobReqDto): Observable<JobGetResDto[]>{
        console.log('testing');
        console.log(data);
        return this.base.get<JobGetResDto[]>(`${BASE_URL_CAN}/jobs/filter/?n=${data.jobName}&c=${data.location}&p=${data.position}&e=${data.employmentType.join()}&ss=${data.salaryStart}&se=${data.salaryEnd}&u=${data.userId}`
        , true)
    }

    getAllBenefitJob(jobId:string): Observable<BenefitGetResDto[]>{
        return this.base.get<BenefitGetResDto[]>(`${BASE_URL_CAN}/benefits?jobId=${jobId}`
        , true)
    }

    getAllByIndustry(industryId:string): Observable<JobGetResDto[]>{
        return this.base.get<JobGetResDto[]>(`${BASE_URL_CAN}/jobs/filter/industry?ind=${industryId}`, true)
    }

    getAllSaveJobs(id:string): Observable<SaveJobGetResDto[]>{
        return this.base.get<SaveJobGetResDto[]>(`${BASE_URL_CAN}/save-jobs/${id}`, true)
    }

    getById(id:string,canId:string):Observable<JobGetResDto>{
        return this.base.get<JobGetResDto>(`${BASE_URL_CAN}/jobs/filter/id?id=${id}&can=${canId}`,true)
    }

    getAllEmploymentType(): Observable<EmploymentTypeGetResDto[]>{
        return this.base.get<EmploymentTypeGetResDto[]>(`${BASE_URL_CAN}/jobs/employment-type`, true)
    }

    getAllPosition(): Observable<JobPositionGetResDto[]>{
        return this.base.get<JobPositionGetResDto[]>(`${BASE_URL_CAN}/jobs/job-position`, true)
    }

    assignJobCandidate(data : AssignJobReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL_CAN}/status-progress/candidate`, data, true)
    }

    insertSaveJob(data : SaveJobInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL_CAN}/save-jobs`, data, true)
    }

    deleteSaveJob(id : string): Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL_CAN}/save-jobs?saveJobId=${id}`, true)
    }

}