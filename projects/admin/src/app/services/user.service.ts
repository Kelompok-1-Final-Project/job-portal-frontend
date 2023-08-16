import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(private base: BaseService){}

    getAll(): Observable<UserGetResDto[]>{
        return this.base.get<UserGetResDto[]>(`${BASE_URL}/users`, true)
    }
}