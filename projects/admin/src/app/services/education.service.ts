import { Injectable } from "@angular/core";
import { SkillGetResDto } from "@dto/skill/skill.get.res.dto";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { EducationGetResDto } from "@dto/education/education.get.res.dto";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class EducationService{

    constructor(private base:BaseService){}

    getByCandidate(param: string): Observable<EducationGetResDto[]>{
        return this.base.get<EducationGetResDto[]>(`${BASE_URL}/educations?candidateId=${param}`, true)
    }
}