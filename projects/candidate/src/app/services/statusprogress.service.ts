import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "@constant/api.constant";
import { StageProgressGetResDto } from "@dto/progress/status-progress-user.get.res.dto";
@Injectable({
    providedIn: 'root'
})
export class StatusProgressService{
    constructor(private base: BaseService){}

    getApplication(email:string):Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/application-id?email=torang@gmail.com`, true)
    }

    getAssessment(email:string):Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/assessment-id?email=torang@gmail.com`, true)
    }

    getMedicalCheckup(email:string): Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/medical-checkup-id?email=torang@gmail.com`, true)
    }

    getInterview(email:string): Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/interview-id?email=torang@gmail.com`, true)
    }

    getHired(email:string): Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/hired-id?email=torang@gmail.com`, true)
    }

    getOffering(email:string): Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/offering-id?email=torang@gmail.com`, true)
    }
}