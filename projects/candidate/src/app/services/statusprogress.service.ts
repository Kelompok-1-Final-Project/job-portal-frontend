import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "@constant/api.constant";
import { StageProgressGetResDto } from "@dto/progress/status-progress-user.get.res.dto";
import { UserEmailReqDto } from "@dto/user/user-email-res.dto";

@Injectable({
    providedIn: 'root'
})
export class StatusProgressService{
    constructor(private base: BaseService){}

    getApplication(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/application-id-non-pagination`, data, true);
    }

    getApplicationWithPagination(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/application-id`, data, true);
    }

    getAssessment(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/assessment-id-non-pagination`, data, true);
    }

    getAssesmentWithPagination(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/assessment-id`, data, true);
    }

    getMedicalCheckup(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/medical-id-non-pagination`, data, true);
    }

    getMedicalCheckupWithPagination(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/medical-id`, data, true);
    }

    getInterview(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/interview-id-non-pagination`, data, true);
    }
    
    getInterviewWithPagination(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/interview-id`, data, true);
    }

    getHired(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/hired-id-non-pagination`, data, true);
    }

    getHiredWithPagination(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/hired-id`, data, true);
    }

    getOffering(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/offering-id-non-pagination`, data, true);
    }

    getOfferingWithPagination(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/offering-id`, data, true);
    }

    getReject(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/reject-id-non-pagination`, data, true);
    }

    getRejectWithPagination(data:UserEmailReqDto):Observable<StageProgressGetResDto[]>{
        return this.base.post<StageProgressGetResDto[]>(`${BASE_URL}/status-progress/reject-id`, data, true);
    }
}