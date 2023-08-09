import { Injectable } from "@angular/core"
import { BaseService } from "./base.service"
import { CandidateAssignInsertReqDto } from "@dto/candidate-assign/candidate-assign-insert.req.dto"
import { InsertResDto } from "@dto/insert.res.dto"
import { Observable } from "rxjs"
import { BASE_URL } from "@constant/api.constant"
import { CandidateResDto } from "@dto/candidate-assign/candidate.res.dto"

@Injectable({
    providedIn : 'root'
})
export class AssignCandidateService{
    constructor(private base : BaseService){}

    insert(data : CandidateAssignInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidateassigns`, data)
    }

    getAll() : Observable<CandidateResDto>{
        return this.base.get<CandidateResDto>(`${BASE_URL}/candidateassigns/assign`)
    }
}