import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "@constant/api.constant";
import { QuestionResDto } from "@dto/question/question.res.dto";
import { QuestionCandidateGetResDto } from "@dto/question-assign/question-candidate-get.res.dto";
import { QuestionReqDto } from "@dto/question/question.req.dto";
import { QuestionInsertReqDto } from "@dto/question/question-insert.req.dto";
import { QuestionOptionResDto } from "@dto/question/question-option.res.dto";
import { QuestionGetResDto } from "@dto/question-assign/question-get.res.dto";


@Injectable({
    providedIn : 'root'
})
export class QuestionService{
    constructor(private base : BaseService){}

    getAll(withToken : boolean) : Observable<QuestionResDto[]>{
        return this.base.get<QuestionResDto[]>(`${BASE_URL}/questions`, withToken)
    }

    getByFilterOneType(typeId : number, packageId : number, topicId : number) : Observable<QuestionResDto[]>{
        return this.base.get<QuestionResDto[]>(`${BASE_URL}/questions/filter-onetype/${typeId}/${packageId}/${topicId}`, true)
    }

    getByFilterAllType(packageId : number, topicId : number) : Observable<QuestionResDto[]>{
        return this.base.get<QuestionResDto[]>(`${BASE_URL}/questions/filter-all/${packageId}/${topicId}`, true)
    }

    getByType(withToken : boolean, id : number) : Observable<QuestionResDto[]>{
        return this.base.get<QuestionResDto[]>(`${BASE_URL}/questions/types/${id}`, withToken)
    }

    getByCandidate(withToken : boolean) : Observable<QuestionGetResDto[]>{
        return this.base.get<QuestionGetResDto[]>(`${BASE_URL}/questions/candidate`, withToken)
    }

    getByReviewer(withToken : boolean, id : number) : Observable<QuestionResDto[]>{
        return this.base.get<QuestionResDto[]>(`${BASE_URL}/questions/reviewer/${id}`, withToken)
    }
    
    getByCandidateType(withToken : boolean, code : string) : Observable<QuestionCandidateGetResDto[]>{
        return this.base.get<QuestionCandidateGetResDto[]>(`${BASE_URL}/questions/candidatetype/?code=${code}`, withToken)
    }

    insert(data : QuestionInsertReqDto[]) : Observable<QuestionReqDto>{
        return this.base.post<QuestionReqDto>(`${BASE_URL}/questions`, data)
    }

    getOption(idQuestion : number) : Observable<QuestionOptionResDto[]>{
        return this.base.get<QuestionOptionResDto[]>(`${BASE_URL}/questions/option/${idQuestion}`)
    }
}