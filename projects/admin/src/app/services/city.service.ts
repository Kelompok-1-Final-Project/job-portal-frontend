import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyGetResDto } from "@dto/company/company.get.res.dto";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class CityService{
    constructor(private base: BaseService){}

    getAll(): Observable<CompanyGetResDto[]>{
        return this.base.get<CompanyGetResDto[]>(`${BASE_URL}/cities`, true)
    }
}