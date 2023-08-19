import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CandidateGetResDto } from "@dto/candidate/candidate.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { UserGetResDto } from "@dto/user/user.get.res.dto";

@Injectable({
    providedIn : 'root'
})
export class CandidateService{
    constructor(private base: BaseService){}

    getAll(): Observable<CandidateGetResDto[]>{
        return this.base.get<CandidateGetResDto[]>(`${BASE_URL}/candidates`, true)
    }

    getCandidateByid(id:string,withToken: boolean): Observable < UserGetResDto > {
        return this.base.get < UserGetResDto > (`${BASE_URL}/candidates/filter/name?n=anggi`, withToken);
    }
}