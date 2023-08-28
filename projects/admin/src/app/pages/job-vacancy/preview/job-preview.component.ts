import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { JobAdminGetResDto } from "@dto/job/job-admin.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'job-preview',
    templateUrl: 'job-preview.component.html'
})
export class JobPreviewComponent implements OnInit{   

    jobId!: string
    job!: JobAdminGetResDto

    constructor(
        private title: Title,
        private jobService: JobService
    ){
        this.title.setTitle('Job Preview | Job Portal Admin')
    }

    ngOnInit(): void {
        firstValueFrom(this.jobService.getById(this.jobId)).then(result => {
            this.job = result
        })
    }
}