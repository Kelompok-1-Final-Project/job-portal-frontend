import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { SkillTestGetResDto } from "@dto/skilltest/skill-test.get.res.dto";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class SkillTestService{
    constructor(private base:BaseService){}

    getAll(): Observable<SkillTestGetResDto[]>{
        return this.base.get<SkillTestGetResDto[]>(`${BASE_URL}/skilltests`, true)
    }
}