import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { MaritalGetResDto } from "@dto/profile/marital.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { GenderGetResDto } from "@dto/profile/gender.get.res.dto";
import { RoleGetResDto } from "@dto/profile/role.get.res.dto";
import { PersonTypeGetResDto } from "@dto/profile/person-type.get.res.dto";

@Injectable({
    providedIn: 'root'
})
export class ProfileService{
    constructor(private base:BaseService){}

    getMaritalStatus(): Observable<MaritalGetResDto[]>{
        return this.base.get<MaritalGetResDto[]>(`${BASE_URL}/profiles/marital`, true)
    }

    getGender(): Observable<GenderGetResDto[]>{
        return this.base.get<GenderGetResDto[]>(`${BASE_URL}/profiles/gender`, true)
    }

    getRole(): Observable<RoleGetResDto[]>{
        return this.base.get<RoleGetResDto[]>(`${BASE_URL}/profiles/role`, true)
    }

    getPersonType(): Observable<PersonTypeGetResDto[]>{
        return this.base.get<PersonTypeGetResDto[]>(`${BASE_URL}/persontype`, true)
    }
}