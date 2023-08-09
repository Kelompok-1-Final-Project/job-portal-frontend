import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { RoleGetResDto } from "@dto/role/role-get.res.dto";
import { BASE_URL } from "@constant/api.constant";


@Injectable({
    providedIn : 'root'
})
export class RoleService{
    constructor(private base : BaseService){}

    getAll(withToken : boolean) : Observable<RoleGetResDto[]>{
        return this.base.get<RoleGetResDto[]>(`${BASE_URL}/roles`, withToken)
    }
}