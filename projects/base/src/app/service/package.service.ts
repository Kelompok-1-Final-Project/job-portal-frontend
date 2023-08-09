import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL } from "@constant/api.constant";
import { QuestionPackageGetResDto } from "@dto/question-package/question-package-get.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";
import { QuestionPackageInsertReqDto } from "@dto/question-package/question-package-insert.req.dto";


@Injectable({
    providedIn : 'root'
})
export class PackageService{
    constructor(private base : BaseService){}

    getAll(withToken : boolean) : Observable<QuestionPackageGetResDto[]>{
        return this.base.get<QuestionPackageGetResDto[]>(`${BASE_URL}/packages`, withToken)
    }

    insert(data : QuestionPackageInsertReqDto) : Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/packages`, data, true)
    }
}