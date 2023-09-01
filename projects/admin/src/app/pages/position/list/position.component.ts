import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { JobPositionGetResDto } from "@dto/job/job-position.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";
import { PositionService } from "@serviceAdmin/position.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'position',
    templateUrl: 'position.component.html'
})
export class PositionComponent implements OnInit{

    positions!: JobPositionGetResDto[]
    search: string = ''
    visibleAdd: boolean = false
    loading: boolean = false

    positionInsertReqDto = this.fb.group({
        positionName: ['', [Validators.required]]
    })

    constructor(
        private title: Title,
        private positionService: PositionService,
        private fb: NonNullableFormBuilder,
        private jobService: JobService
    ){}

    ngOnInit(): void {
        this.getAll()
    }

    insertPosition(){
        this.loading = true
        const data = this.positionInsertReqDto.getRawValue()
        firstValueFrom(this.positionService.insertJobPosition(data)).then(result => {
            this.loading = false
            this.visibleAdd = false
            this.getAll()
        })
    }

    getAll(){
        firstValueFrom(this.jobService.getJobPosition()).then(result =>{
            this.positions = result
        })
    }

    add(){
        this.visibleAdd = true
    }

    update(code: string){

    }
}