import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { EducationGetResDto } from "@dto/education/education.get.res.dto";
import { WorkExperienceGetResDto } from "@dto/workexperience/work-experience.get.res.dto";
import { UserSkillGetResDto } from "@dto/userskill/user-skill.get.res.dto";
import { OrganizationGetResDto } from "@dto/organization/organization.get.res.dto";
import { FamilyGetResDto } from "@dto/family/family.get.res.dto";
import { EducationInsertReqDto } from "@dto/education/education.insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class ProfileService{
    constructor(private base:BaseService){}

    getEducation(userId:string): Observable<EducationGetResDto[]>{
        return this.base.get<EducationGetResDto[]>(`${BASE_URL_CAN}/educations?candidateId=${userId}`, true)
    }

    insertEducation(data : EducationInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/educations`, data, true)
    }

    getWorkExperience(userId:string): Observable<WorkExperienceGetResDto[]>{
        return this.base.get<WorkExperienceGetResDto[]>(`${BASE_URL_CAN}/work-experience?candidateId=${userId}`, true)
    }

    getSkills(userId:string): Observable<UserSkillGetResDto[]>{
        return this.base.get<UserSkillGetResDto[]>(`${BASE_URL_CAN}/skills/user?candidateId=${userId}`, true)
    }

    getOrganizations(userId:string): Observable<OrganizationGetResDto[]>{
        return this.base.get<OrganizationGetResDto[]>(`${BASE_URL_CAN}/organizations?candidateId=${userId}`, true)
    }

    getFamily(userId:string): Observable<FamilyGetResDto[]>{
        return this.base.get<FamilyGetResDto[]>(`${BASE_URL_CAN}/families?candidateId=${userId}`, true)
    }

}