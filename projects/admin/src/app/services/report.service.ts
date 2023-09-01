import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { ReportGetResDto } from "@dto/report/report.get.res.dto";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    constructor(private base: BaseService) { }

    getAll(startDate : string, endDate : string): Observable<ReportGetResDto[]> {
        return this.base.get<ReportGetResDto[]>(`${BASE_URL}/reports/?start=${startDate}&end=${endDate}`, true)
    }
}