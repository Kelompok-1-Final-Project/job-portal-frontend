import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CandidateGetResDto } from "@dto/candidate/candidate.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { CandidateInsertReqDto } from "@dto/candidate/candidate.insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateService{
    constructor(private base: BaseService){}

    getAll(): Observable<CandidateGetResDto[]>{
        return this.base.get<CandidateGetResDto[]>(`${BASE_URL}/candidates`, true)
    }

    insert(data: CandidateInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/candidates`, data, true)
    }
}