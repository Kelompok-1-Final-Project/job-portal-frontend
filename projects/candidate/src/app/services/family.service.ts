import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";
import { RelationshipGetResDto } from "@dto/relationship/relationship.get.res.dto";
import { DegreeGetResDto } from "@dto/degree/relationship.get.res.dto";
import { FamilyInsertReqDto } from "@dto/family/family.insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";
import { FamilyUpdateReqDto } from "@dto/family/family.update.req.dto";
import { UpdateResDto } from "@dto/update.res.dto";
import { DeleteResDto } from "@dto/delete.res.dto";

@Injectable({
    providedIn: 'root'
})
export class FamilyService{
    constructor(private base: BaseService){}

    getAllRelationship(): Observable<RelationshipGetResDto[]>{
        return this.base.get<RelationshipGetResDto[]>(`${BASE_URL_CAN}/families`, true)
    }

    getAllDegree(): Observable<DegreeGetResDto[]>{
        return this.base.get<DegreeGetResDto[]>(`${BASE_URL_CAN}/families/degree`, true)
    }

    insertFamily(data : FamilyInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL_CAN}/families`, data, true)
    }

    updateFamily(data : FamilyUpdateReqDto): Observable<UpdateResDto>{
        return this.base.patch<UpdateResDto>(`${BASE_URL_CAN}/families`, data, true)
    }

    deleteFamily(id : string): Observable<DeleteResDto>{
        return this.base.delete<DeleteResDto>(`${BASE_URL_CAN}/families?familyId=${id}`, true)
    }
}