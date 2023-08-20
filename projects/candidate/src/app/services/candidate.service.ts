import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CandidateGetResDto } from "@dto/candidate/candidate.get.res.dto";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { UserGetResDto } from "@dto/user/user.get.res.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateService{
    constructor(private base: BaseService){}

    getAll(): Observable<CandidateGetResDto[]>{
        return this.base.get<CandidateGetResDto[]>(`${BASE_URL}/candidates`, true)
    }
    
    getCandidateByid(userId : string) : Observable<CandidateGetResDto>{
        return this.base.get<CandidateGetResDto>(`${BASE_URL_CAN}/users/${userId}`)
    }
}