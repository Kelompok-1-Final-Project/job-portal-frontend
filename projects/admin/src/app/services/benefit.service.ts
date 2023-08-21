import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BenefitGetResDto } from "@dto/benefit/benefit.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { BenefitInsertReqDto } from "@dto/benefit/benefit.insert.req.dto";

@Injectable({
    providedIn: 'root'
})
export class BenefitService {

    constructor(private base: BaseService) { }

    getAll(): Observable<BenefitGetResDto[]> {
        return this.base.get<BenefitGetResDto[]>(`${BASE_URL}/benefits`, true)
    }

    insert(data: BenefitInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/benefits`, data, true)
    }
}