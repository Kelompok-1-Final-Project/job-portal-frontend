import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { CandidateInsertReqDto } from "@dto/candidate/candidate.insert.req.dto";
import { UserInsertReqDto } from "@dto/user/user.insert.req.dto";
import { UpdateResDto } from "@dto/update.res.dto";
import { CandidateRegistrationReqDto } from "@dto/candidate/candidate.registration.req.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(private base: BaseService){}

    getAll(): Observable<UserGetResDto[]>{
        return this.base.get<UserGetResDto[]>(`${BASE_URL}/users`, true)
    }

    insert( data:CandidateRegistrationReqDto):Observable<UpdateResDto>{
        return this.base.post<UpdateResDto>(`${BASE_URL_CAN}/users`,data);
    }
}