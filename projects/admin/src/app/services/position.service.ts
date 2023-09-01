import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { JobPositionInsertReqDto } from "@dto/job/job-position.insert.req.dto";
import { Observable } from "rxjs";
import { InsertResDto } from "@dto/insert.res.dto";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private base: BaseService) { }

    insertJobPosition(data: JobPositionInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/job-position`, data, true)
    }
}