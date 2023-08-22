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

@Injectable({
    providedIn: 'root'
})
export class JobService{
    constructor(private base: BaseService){}

    getAll(data : SearchJobReqDto): Observable<JobGetResDto[]>{
        return this.base.get<JobGetResDto[]>(`${BASE_URL_CAN}/jobs/filter/?n=${data.jobName}&c=${data.location}&p=${data.position}&e=${data.employmentType}&ss=${data.salaryStart}&se=${data.salaryEnd}`
        , true)
    }

    getAllSaveJobs(id:string): Observable<SaveJobGetResDto[]>{
        return this.base.get<SaveJobGetResDto[]>(`${BASE_URL_CAN}/save-jobs/${id}`, true)
    }

    getById(id:string):Observable<JobGetResDto>{
        return this.base.get<JobGetResDto>(`${BASE_URL_CAN}/jobs/filter/id?id=${id}`,true)
    }

    getAllEmploymentType(): Observable<EmploymentTypeGetResDto[]>{
        return this.base.get<EmploymentTypeGetResDto[]>(`${BASE_URL}/jobs/employment-type`, true)
    }

    insertSaveJob(data : SaveJobInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL_CAN}/save-jobs`, data, true)
    }

    deleteSaveJob(id : string): Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL_CAN}/save-jobs?saveJobId=${id}`, true)
    }

}