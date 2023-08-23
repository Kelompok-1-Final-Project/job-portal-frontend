import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { SkillGetResDto } from "@dto/skill/skill.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { SkillInsertReqDto } from "@dto/skill/skill.insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";
import { SkillUpdateReqDto } from "@dto/skill/skill.update.req.dto";
import { UpdateResDto } from "@dto/update.res.dto";

@Injectable({
    providedIn: 'root'
})
export class SkillService{
    constructor(private base:BaseService){}

    getAll(): Observable<SkillGetResDto[]>{
        return this.base.get<SkillGetResDto[]>(`${BASE_URL}/skills`, true)
    }

    insert(data: SkillInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/skills`, data, true)
    }

    update(data: SkillUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/skills`, data, true)
    }
}