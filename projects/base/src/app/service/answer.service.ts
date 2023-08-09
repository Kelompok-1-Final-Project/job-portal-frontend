import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { BASE_URL } from "@constant/api.constant";
import { InsertResDto } from "@dto/insert.res.dto";
import { CandidateFileReqDto } from "@dto/answer-candidate/candidate-file.req.dto";
import { AnswerCandidateWithQuestionResDto } from "@dto/answer-candidate/answer-candidate-with-question.res.dto";
import { AnswerCandidateReqDto } from "@dto/answer-candidate/answer-candidate.req.dto";
import { FileTypeResDto } from "@dto/answer-candidate/file-type.res.dto";

@Injectable({
    providedIn : 'root'
})
export class AnswerService{
    constructor(private base : BaseService){}

    insertFile(data : CandidateFileReqDto[]) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/answers/uploadfile`, data)
    }

    getAnswerCan(candidateId : number) : Observable<AnswerCandidateWithQuestionResDto[]>{
        return this.base.get<AnswerCandidateWithQuestionResDto[]>(`${BASE_URL}/answers/candidate/?i=${candidateId}`)
    }

    insert(data : AnswerCandidateReqDto[]) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/answers`, data)
    }

    getAll() : Observable<FileTypeResDto[]>{
        return this.base.get<FileTypeResDto[]>(`${BASE_URL}/answers/filetype`, true)
    }
}