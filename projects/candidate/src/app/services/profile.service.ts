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
import { EducationUpdateReqDto } from "@dto/education/education.update.req.dto";
import { UpdateResDto } from "@dto/update.res.dto";
import { DeleteResDto } from "@dto/delete.res.dto";
import { WorkExperienceInsertReqDto } from "@dto/workexperience/work-experience.insert.req.dto";
import { WorkExperienceUpdateReqDto } from "@dto/workexperience/work-experience.update.req.dto";
import { OrganizationInsertReqDto } from "@dto/organization/organization.insert.req.dto";
import { OrganizationUpdateReqDto } from "@dto/organization/organization.update.req.dto";
import { ProfileGetResDto } from "@dto/profile/profile.get.res.dto";
import { ProfileUpdateReqDto } from "@dto/profile/profile.update.req.dto";
import { MaritalGetResDto } from "@dto/profile/marital.get.res.dto";
import { GenderGetResDto } from "@dto/profile/gender.get.res.dto";

@Injectable({
    providedIn: 'root'
})
export class ProfileService{
    constructor(private base:BaseService){}

    getEducation(userId:string): Observable<EducationGetResDto[]>{
        return this.base.get<EducationGetResDto[]>(`${BASE_URL_CAN}/educations?candidateId=${userId}`, true)
    }

    insertEducation(data : EducationInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL_CAN}/educations`, data, true)
    }

    updateEducation(data : EducationUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL_CAN}/educations`, data, true)
    }

    deleteEducation(id : string): Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL_CAN}/educations?educationId=${id}`, true)
    }

    getWorkExperience(userId:string): Observable<WorkExperienceGetResDto[]>{
        return this.base.get<WorkExperienceGetResDto[]>(`${BASE_URL_CAN}/work-experience?candidateId=${userId}`, true)
    }

    insertWorkExp(data : WorkExperienceInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL_CAN}/work-experience`, data, true)
    }

    updateWorkExp(data : WorkExperienceUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL_CAN}/work-experience`, data, true)
    }

    deleteWorkExp(id : string): Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL_CAN}/work-experience?experienceId=${id}`, true)
    }

    getSkills(userId:string): Observable<UserSkillGetResDto[]>{
        return this.base.get<UserSkillGetResDto[]>(`${BASE_URL_CAN}/skills/user?candidateId=${userId}`, true)
    }

    getOrganizations(userId:string): Observable<OrganizationGetResDto[]>{
        return this.base.get<OrganizationGetResDto[]>(`${BASE_URL_CAN}/organizations?candidateId=${userId}`, true)
    }

    insertOrganiztion(data : OrganizationInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL_CAN}/organizations`, data, true)
    }

    updateOrganization(data : OrganizationUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL_CAN}/organizations`, data, true)
    }

    deleteOrganization(id : string): Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL_CAN}/organizations?organizationId=${id}`, true)
    }

    getFamily(userId:string): Observable<FamilyGetResDto[]>{
        return this.base.get<FamilyGetResDto[]>(`${BASE_URL_CAN}/families/candidate?id=${userId}`, true)
    }

    updateProfile(data : ProfileUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL_CAN}/profiles`, data, true)
    }

    getAllMarital(): Observable<MaritalGetResDto[]>{
        return this.base.get<MaritalGetResDto[]>(`${BASE_URL_CAN}/profiles/marital`, true)
    }

    getAllGender(): Observable<GenderGetResDto[]>{
        return this.base.get<GenderGetResDto[]>(`${BASE_URL_CAN}/profiles/gender`, true)
    }
}