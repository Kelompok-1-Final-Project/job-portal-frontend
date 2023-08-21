import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyGetResDto } from "@dto/company/company.get.res.dto";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { CompanyDataGetResDto } from "@dto/company/company-data.get.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CompanyService{
    constructor(private base: BaseService){}

    getAll():Observable<CompanyDataGetResDto[]>{
        return this.base.get<CompanyDataGetResDto[]>(`${BASE_URL_CAN}/companies`)
    }

    getById(id:string):Observable<CompanyDataGetResDto>{
        return this.base.get<CompanyDataGetResDto>(`${BASE_URL_CAN}/companies/detail?id=${id}`)
    }

    
}