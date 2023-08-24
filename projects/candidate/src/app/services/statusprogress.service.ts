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
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/application-id?email=${email}`, true)
    }

    getAssessment(email:string):Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/assessment-id?email=${email}`, true)
    }

    getMedicalCheckup(email:string): Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/medical-checkup-id?email=${email}`, true)
    }

    getInterview(email:string): Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/interview-id?email=${email}`, true)
    }

    getHired(email:string): Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/hired-id?email=${email}`, true)
    }

    getOffering(email:string): Observable<StageProgressGetResDto[]>{
        return this.base.get<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/offering-id?email=${email}`, true)
    }
}