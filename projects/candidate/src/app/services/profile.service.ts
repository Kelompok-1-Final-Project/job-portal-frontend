import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { MaritalGetResDto } from "@dto/profile/marital.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { GenderGetResDto } from "@dto/profile/gender.get.res.dto";

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
}