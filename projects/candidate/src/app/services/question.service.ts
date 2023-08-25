import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { QuestionGetResDto } from "@dto/question/question.get.res.dto";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { QuestionOptionResDto } from "@dto/question/question-option.res.dto";
import { TestGetResDto } from "@dto/answer/test.get.res.dto";

@Injectable({
    providedIn: 'root'
})
export class QuestionService{

    constructor(private base: BaseService){}

    getAll(): Observable<TestGetResDto>{
        return this.base.get<TestGetResDto>(`${BASE_URL_CAN}/answers/3859e18b-74bf-4cc2-95b7-c5106df4ba39`, true)
    }
}