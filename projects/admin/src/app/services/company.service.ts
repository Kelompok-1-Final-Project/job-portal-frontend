import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyGetResDto } from "@dto/company/company.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { CompanyInsertReqDto } from "@dto/company/company.insert.req.dto";

@Injectable({
    providedIn: 'root'
})
export class CompanyService{
    constructor(private base: BaseService){}

    getAll():Observable<CompanyGetResDto[]>{
        return this.base.get<CompanyGetResDto[]>(`${BASE_URL}/companies`)
    }

    insert(data: CompanyInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/companies`, data, true)
    }
}