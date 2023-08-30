import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { JobAdminGetResDto } from "@dto/job/job-admin.get.res.dto";
import { JobPreviewGetResDto } from "@dto/job/job-preview.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'job-preview',
    templateUrl: 'job-preview.component.html'
})
export class JobPreviewComponent implements OnInit{   

    jobId!: string
    job!: JobPreviewGetResDto

    constructor(
        private title: Title,
        private jobService: JobService,
        private route: ActivatedRoute
    ){
        this.title.setTitle('Job Preview | Job Portal Admin')
    }

    ngOnInit(): void {
        firstValueFrom(this.route.params).then(param => {
            this.jobId = param['id']
            this.getPreview()
        })
    }

    getPreview(){
        firstValueFrom(this.jobService.getPreview(this.jobId)).then(result => {
            this.job = result
        })
    }

}