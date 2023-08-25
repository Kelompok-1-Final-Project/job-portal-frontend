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
import { AssessmentInsertReqDto } from "@dto/assessment/assessment.insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";
import { InterviewInsertReqDto } from "@dto/interview/interview.insert.req.dto";
import { MedicalCheckupInsertReqDto } from "@dto/medicalcheckup/medical-checkup.insert.req.dto";
import { OfferingInsertReqDto } from "@dto/offering/offering.insert.req.dto";
import { HiredInsertReqDto } from "@dto/hired/hired.insert.req.dto";
import { CandidateRejectReqDto } from "@dto/candidateprogress/candidate-reject.req.dto";
import { UpdateResDto } from "@dto/update.res.dto";
import { InterviewUpdateReqDto } from "@dto/interview/interview.update.req.dto";
import { MedicalCheckupUpdateReqDto } from "@dto/medicalcheckup/medical-checkup.update.req.dto";

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

    getCandidateByJob(param: string): Observable<CandidateProgressGetResDto[]>{
        return this.base.get<CandidateProgressGetResDto[]>(`${BASE_URL}/jobcandidatestatus?jobCode=${param}`, true)
    }

    insertAssessment(data:AssessmentInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/status-progress/assessment`,data, true)
    }

    insertInterview(data: InterviewInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/status-progress/interview`, data, true)
    }

    insertMedicalCheckup(data: MedicalCheckupInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/status-progress/medical-checkup`, data, true)
    }

    insertOffering(data: OfferingInsertReqDto):Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/status-progress/offering`, data, true)
    }

    insertHired(data: HiredInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/status-progress/hired`, data, true)
    }

    updateReject(data: CandidateRejectReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/status-progress/rejected`, data, true)
    }

    updateNotes(data: InterviewUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/status-progress/interview`, data, true)
    }

    updateMcuFile(data: MedicalCheckupUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/status-progress/medical`, data, true)
    }
}