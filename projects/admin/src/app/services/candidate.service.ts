import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CandidateGetResDto } from "@dto/candidate/candidate.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { CandidateInsertReqDto } from "@dto/candidate/candidate.insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";
import { FamilyAdminGetResDto } from "@dto/family/family-admin.get.res.dto";
import { WorkExperienceGetResDto } from "@dto/workexperience/work-experience.get.res.dto";
import { ExperienceAdminInsertReqDto } from "@dto/workexperience/experience-admin.insert.req.dto";
import { CandidateProfileGetResDto } from "@dto/candidate/candidate-profile.get.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CandidateService {
    constructor(private base: BaseService) { }

    getAll(): Observable<CandidateGetResDto[]> {
        return this.base.get<CandidateGetResDto[]>(`${BASE_URL}/candidates`, true)
    }

    insert(data: CandidateInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/candidates`, data, true)
    }

    getFamily(param: string): Observable<FamilyAdminGetResDto[]> {
        return this.base.get<FamilyAdminGetResDto[]>(`${BASE_URL}/families/candidate?candidateId=${param}`, true)
    }

    getExperience(param: string): Observable<WorkExperienceGetResDto[]> {
        return this.base.get<WorkExperienceGetResDto[]>(`${BASE_URL}/work-experience?candidateId=${param}`, true)
    }

    insertExperience(data: ExperienceAdminInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/work-experience`, data, true)
    }

    getCandidateDetail(param: string): Observable<CandidateProfileGetResDto> {
        return this.base.get<CandidateProfileGetResDto>(`${BASE_URL}/candidates/${param}`, true)
    }
}