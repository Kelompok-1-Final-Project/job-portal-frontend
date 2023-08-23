import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyGetResDto } from "@dto/company/company.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { CityInsertReqDto } from "@dto/city/city.insert.req.dto";
import { CityGetResDto } from "@dto/city/city.get.res.dto";
import { CityUpdateReqDto } from "@dto/city/city.update.req.dto";
import { UpdateResDto } from "@dto/update.res.dto";

@Injectable({
    providedIn: 'root'
})
export class CityService{
    constructor(private base: BaseService){}

    getAll(): Observable<CityGetResDto[]>{
        return this.base.get<CityGetResDto[]>(`${BASE_URL}/cities`, true)
    }

    insert(data : CityInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/cities`, data, true)
    }

    update(data: CityUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/cities`, data, true)
    }
}