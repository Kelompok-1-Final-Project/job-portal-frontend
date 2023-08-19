import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { AnswerCandidateReqDto } from "@dto/answer/answer-candidate.req.dto";

@Injectable({
    providedIn: 'root'
})
export class AnswerService{
    constructor(private base: BaseService){}

    insert(data : AnswerCandidateReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL_CAN}/answers`, data, true)
    }
}