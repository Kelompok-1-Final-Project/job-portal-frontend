import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyGetResDto } from "@dto/company/company.get.res.dto";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class CompanyService{
    constructor(private base: BaseService){}

    getAll():Observable<CompanyGetResDto[]>{
        return this.base.get<CompanyGetResDto[]>(`${BASE_URL_CAN}/companies`)
    }

    getById(id:string):Observable<CompanyGetResDto>{
        return this.base.get<CompanyGetResDto>(`${BASE_URL_CAN}/companies/detail?id=${id}`)
    }

    
}