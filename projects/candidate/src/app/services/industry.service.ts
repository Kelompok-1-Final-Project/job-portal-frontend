import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { IndustryGetResDto } from "@dto/industry/industry.get.res.dto";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { IndustryInsertReqDto } from "@dto/industry/industry.insert.req.dto";

@Injectable({
    providedIn: 'root'
})
export class IndustryService{
    constructor(private base: BaseService){}

    getAll(): Observable<IndustryGetResDto[]>{
        return this.base.get<IndustryGetResDto[]>(`${BASE_URL_CAN}/industries`, true)
    }

    insert(data: IndustryInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/industries`, data, true)
    }
}