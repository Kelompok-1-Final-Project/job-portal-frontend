import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { IndustryGetResDto } from "@dto/industry/industry.get.res.dto";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class IndustryService{
    constructor(private base: BaseService){}

    getAll(): Observable<IndustryGetResDto[]>{
        return this.base.get<IndustryGetResDto[]>(`${BASE_URL}/industries`, true)
    }
}