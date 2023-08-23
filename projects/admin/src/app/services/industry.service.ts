import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { IndustryGetResDto } from "@dto/industry/industry.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { IndustryInsertReqDto } from "@dto/industry/industry.insert.req.dto";
import { IndustryUpdateReqDto } from "@dto/industry/industry.update.req.dto";
import { UpdateResDto } from "@dto/update.res.dto";

@Injectable({
    providedIn: 'root'
})
export class IndustryService{
    constructor(private base: BaseService){}

    getAll(): Observable<IndustryGetResDto[]>{
        return this.base.get<IndustryGetResDto[]>(`${BASE_URL}/industries`, true)
    }

    insert(data: IndustryInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/industries`, data, true)
    }

    update(data: IndustryUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL}/industries`, data, true)
    }
}