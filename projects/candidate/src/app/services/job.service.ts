import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { JobGetResDto } from "@dto/job/job.get.res.dto";
import { EmploymentTypeGetResDto } from "@dto/job/employment-type.get.res.dto";

@Injectable({
    providedIn: 'root'
})
export class JobService{
    constructor(private base: BaseService){}

    getAll(): Observable<JobGetResDto[]>{
        return this.base.get<JobGetResDto[]>(`${BASE_URL_CAN}/jobs/filter/?n=&c=&p=&e=&ss=0&se=0`, true)
    }

    getAllEmploymentType(): Observable<EmploymentTypeGetResDto[]>{
        return this.base.get<EmploymentTypeGetResDto[]>(`${BASE_URL}/jobs/employment-type`, true)
    }
}