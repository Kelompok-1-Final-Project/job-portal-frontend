import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "@constant/api.constant";
import { QuestionTypeGetResDto } from "@dto/question-type/question-type-get.res.dto";


@Injectable({
    providedIn : 'root'
})
export class QuestionTypeService{
    constructor(private base : BaseService){}

    getAll(withToken : boolean) : Observable<QuestionTypeGetResDto[]>{
        return this.base.get<QuestionTypeGetResDto[]>(`${BASE_URL}/types`, withToken)
    }
}