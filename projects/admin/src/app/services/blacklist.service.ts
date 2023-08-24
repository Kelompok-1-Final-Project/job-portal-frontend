import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { BlacklistGetResDto } from "@dto/blacklist/blacklist.get.res.dto";
import { BASE_URL } from "@constant/api.constant";
import { BlacklistInsertReqDto } from "@dto/blacklist/blacklist-insert.req.dto";
import { InsertResDto } from "@dto/insert.res.dto";

@Injectable({
    providedIn: 'root'
})
export class BlacklistService{

    constructor(private base: BaseService){}

    getAll(): Observable<BlacklistGetResDto[]>{
        return this.base.get<BlacklistGetResDto[]>(`${BASE_URL}/blacklist`, true)
    }

    insert(data: BlacklistInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${BASE_URL}/blacklist`,data, true)
    }
}