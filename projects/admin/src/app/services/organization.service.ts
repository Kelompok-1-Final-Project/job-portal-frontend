import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { OrganizationGetResDto } from "@dto/organization/organization.get.res.dto";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn : 'root'
})
export class OrganizationService{

    constructor(private base: BaseService){}

    getByCandidate(param: string): Observable<OrganizationGetResDto[]>{
        return this.base.get<OrganizationGetResDto[]>(`${BASE_URL}/organizations?candidateId=${param}`)
    }
}