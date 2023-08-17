import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ApplicationGetResDto } from "@dto/application/application.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { AssessmentGetResDto } from "@dto/assessment/assessment.get.res.dto";
import { MedicalCheckupGetResDto } from "@dto/medicalcheckup/medical-checkup.get.res.dto";
import { InterviewGetResDto } from "@dto/interview/interview.get.res.dto";
import { HiredGetResDto } from "@dto/hired/hired.get.res.dto";
import { OfferingGetResDto } from "@dto/offering/offering.get.res.dto";
import { StatusProgressGetResDto } from "@dto/progress/status-progress.get.res.dto";
import { CandidateProgressGetResDto } from "@dto/candidateprogress/candidate-progress.get.res.dto";

@Injectable({
    providedIn: 'root'
})
export class StatusProgressService{
    constructor(private base: BaseService){}

    getApplication():Observable<ApplicationGetResDto[]>{
        return this.base.get<ApplicationGetResDto[]>(`${BASE_URL}/status-progress/application`, true)
    }

    getAssessment():Observable<AssessmentGetResDto[]>{
        return this.base.get<AssessmentGetResDto[]>(`${BASE_URL}/status-progress/assessment`, true)
    }

    getMedicalCheckup(): Observable<MedicalCheckupGetResDto[]>{
        return this.base.get<MedicalCheckupGetResDto[]>(`${BASE_URL}/status-progress/medical-checkup`, true)
    }

    getInterview(): Observable<InterviewGetResDto[]>{
        return this.base.get<InterviewGetResDto[]>(`${BASE_URL}/status-progress/interview`, true)
    }

    getHired(): Observable<HiredGetResDto[]>{
        return this.base.get<HiredGetResDto[]>(`${BASE_URL}/status-progress/hired`, true)
    }

    getOffering(): Observable<OfferingGetResDto[]>{
        return this.base.get<OfferingGetResDto[]>(`${BASE_URL}/status-progress/offering`, true)
    }

    getStatus(): Observable<StatusProgressGetResDto[]>{
        return this.base.get<StatusProgressGetResDto[]>(`${BASE_URL}/status-progress`, true)
    }

    getCandidateStatus(): Observable<CandidateProgressGetResDto[]>{
        return this.base.get<CandidateProgressGetResDto[]>(`${BASE_URL}/status-progress/candidate`, true)
    }
}