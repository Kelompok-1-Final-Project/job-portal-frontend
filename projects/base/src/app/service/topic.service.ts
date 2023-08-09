import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "@constant/api.constant";
import { QuestionTopicGetResDto } from "@dto/question-topic/question-topic-get.res.dto";
import { InsertResDto } from "@dto/insert.res.dto";
import { QuestionTopicInsertReqDto } from "@dto/question-topic/question-topic-insert.req.dto";


@Injectable({
    providedIn : 'root'
})
export class TopicService{
    constructor(private base : BaseService){}

    getAll(withToken : boolean) : Observable<QuestionTopicGetResDto[]>{
        return this.base.get<QuestionTopicGetResDto[]>(`${BASE_URL}/topics`, withToken)
    }

    insert(data : QuestionTopicInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/topics`, data, true)
    }
}