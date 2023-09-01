import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { UserInsertReqDto } from "@dto/user/user.insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";
import { UpdateResDto } from "@dto/update.res.dto";
import { UserIsActiveUpdateReqDto } from "@dto/user/user-is-active-update.req.dto";
import { UserUpdateReqDto } from "@dto/user/user-update.req.dto";
import { UserChangePassReqDto } from "@dto/user/user-change-password.req.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private base: BaseService) { }

    getAll(): Observable<UserGetResDto[]> {
        return this.base.get<UserGetResDto[]>(`${BASE_URL}/users`, true)
    }

    insert(data: UserInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/users`, data, true)
    }

    getHr(): Observable<UserGetResDto[]> {
        return this.base.get<UserGetResDto[]>(`${BASE_URL}/users/hr`, true)
    }

    getInterviewer(): Observable<UserGetResDto[]> {
        return this.base.get<UserGetResDto[]>(`${BASE_URL}/users/interviewer`, true)
    }

    setIsActive(data: UserIsActiveUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/users/update-active`, data, true)
    }

    getDetail(param: string): Observable<UserGetResDto> {
        return this.base.get<UserGetResDto>(`${BASE_URL}/users/detail?userId=${param}`, true)
    }

    update(data: UserUpdateReqDto): Observable<UpdateResDto> {
        return this.base.patch<UpdateResDto>(`${BASE_URL}/users`, data, true)
    }

    changePassword(data: UserChangePassReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/users/change-password`, data, true)
    }
}