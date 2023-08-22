import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { SkillGetResDto } from "@dto/skill/skill.get.res.dto";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { LevelGetResDto } from "@dto/level/level.get.res.dto";
import { UserSkillInsertReqto } from "@dto/userskill/user-skill.insert.req.dto";
import { SkillUpdateReqDto } from "@dto/skill/skill.update.req.dto";
import { UpdateResDto } from "@dto/update.res.dto";
import { DeleteResDto } from "@dto/delete.res.dto";

@Injectable({
    providedIn: 'root'
})
export class SkillService{
    constructor(private base:BaseService){}

    getAll(): Observable<SkillGetResDto[]>{
        return this.base.get<SkillGetResDto[]>(`${BASE_URL_CAN}/skills`, true)
    }

    getAllLevel(): Observable<LevelGetResDto[]>{
        return this.base.get<LevelGetResDto[]>(`${BASE_URL_CAN}/skills/level`, true)
    }

    insertSkillCandidate(data: UserSkillInsertReqto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL_CAN}/skills/user`, data, true)
    }

    updateSkillCandidate(data : SkillUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL_CAN}/skills/user`, data, true)
    }

    deleteSkillCandidate(id : string): Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL_CAN}/skills?userSkillId=${id}`, true)
    }
}