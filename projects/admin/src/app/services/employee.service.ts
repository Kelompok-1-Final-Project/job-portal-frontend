import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { EmployeeGetResDto } from "@dto/employee/employee.get.res.dto";
import { BASE_URL } from "@constant/api.constant";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private base: BaseService) { }

    getAll(): Observable<EmployeeGetResDto[]>{
        return this.base.get<EmployeeGetResDto[]>(`${BASE_URL}/employees`, true)
    }
}