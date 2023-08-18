import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { QuestionGetResDto } from "@dto/question/question.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { QuestionInsertReqDto } from "@dto/question/question.insert.req.dto";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private base: BaseService) { }

    getAll(): Observable<QuestionGetResDto[]> {
        return this.base.get<QuestionGetResDto[]>(`${BASE_URL}/questions`, true)
    }

    insert(data: QuestionInsertReqDto[]): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${BASE_URL}/questions`, data, true)
    }
}