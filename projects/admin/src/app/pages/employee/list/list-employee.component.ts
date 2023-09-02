import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { EmployeeGetResDto } from "@dto/employee/employee.get.res.dto";
import { BlacklistService } from "@serviceAdmin/blacklist.service";
import { EmployeeService } from "@serviceAdmin/employee.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'list-employee',
    templateUrl: 'list-employee.component.html',
    styleUrls: ['list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {

    employees!: EmployeeGetResDto[]
    visibleBlacklist: boolean = false
    loading: boolean = false
    search: string = ''

    blacklistInsertReqDto = this.fb.group({
        candidateId : ['', [Validators.required]],
        companyId: ['', [Validators.required]]
    })

    constructor(
        private title: Title,
        private employeeService: EmployeeService,
        private fb: NonNullableFormBuilder,
        private blacklistService: BlacklistService,
        private router: Router
    ) {
        this.title.setTitle('List Employee | Job Portal Admin')
    }

    ngOnInit(): void {
        this.getEmployee()
    }

    getEmployee() {
        firstValueFrom(this.employeeService.getAll()).then(result =>{
            this.employees = result
        })
    }

    add(candidate: string, company: string){
        this.blacklistInsertReqDto.get('candidateId')?.setValue(candidate)
        this.blacklistInsertReqDto.get('companyId')?.setValue(company)
        this.visibleBlacklist = true
    }

    insertBlacklist(){
        this.loading = true
        const data = this.blacklistInsertReqDto.getRawValue()
        firstValueFrom(this.blacklistService.insert(data)).then(result => {
            this.loading = false
            this.visibleBlacklist = false 
        })
    }
}