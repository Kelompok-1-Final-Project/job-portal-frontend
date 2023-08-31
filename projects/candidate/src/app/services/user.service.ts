import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { UpdateResDto } from "@dto/update.res.dto";
import { CandidateRegistrationReqDto } from "@dto/candidate/candidate.registration.req.dto";
import { UserChangePassReqDto } from "@dto/user/user-change-password.req.dto";

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

    changePassword(data : UserChangePassReqDto) : Observable<UpdateResDto>{
        console.log(data)
        return this.base.patch<UpdateResDto>(`${BASE_URL_CAN}/users/change-password`, data, true)
    }
}