import { Injectable } from "@angular/core";
import { UserLoginReqDto } from "@dto/user/user-login.req.dto";
import { Observable } from "rxjs";
import { UserLoginResDto } from "@dto/user/user-login.res.dto";
import { BaseService } from "./base.service";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn : 'root'
})
export class LoginService{

    constructor(private base : BaseService){}

    login(data : UserLoginReqDto) : Observable<UserLoginResDto>{
        return this.base.post<UserLoginResDto>(`${BASE_URL}/login`, data, false)
    }
}