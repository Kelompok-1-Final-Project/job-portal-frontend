import { Injectable } from "@angular/core";
import { UserGetResDto } from "@dto/user/user-get.res.dto";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { UserInsertReqDto } from "@dto/user/user-insert.req.dto";
import { UserProfileResDto } from "@dto/user/user-profile.res.dto";
import { UpdateResDto } from "@dto/update.res.dto";
import { UserUpdateActiveReqDto } from "@dto/user/user-update-active.req.dto"
import { UserChangePassReqDto } from "@dto/user/user-change-pass.req.dto";
import { ProfileUpdateReqDto } from "@dto/profile/profile-update.req.dto";

@Injectable({
    providedIn : 'root'
})
export class UserService{
    constructor(private base : BaseService){}

    getAll(withToken : boolean) : Observable<UserGetResDto[]>{
        return this.base.get<UserGetResDto[]>(`${BASE_URL}/users`, withToken)
    }

    getByRoleCode(withToken : boolean, code : string) : Observable<UserGetResDto[]>{
        return this.base.get<UserGetResDto[]>(`${BASE_URL}/users/?code=${code}`, withToken)
    }

    insert(data : UserInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/users`, data)
    }

    getProfile() : Observable<UserProfileResDto>{
        return this.base.get<UserProfileResDto>(`${BASE_URL}/users/profile`)
    }

    updateActive(data : UserUpdateActiveReqDto ) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/users/update-acvite`, data)
    }

    changePassword(data : UserChangePassReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/users/change-password`, data)
    }

    updateProfile(data : ProfileUpdateReqDto) : Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/users/update-profile`, data)
    }
}