import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { BenefitGetResDto } from "@dto/benefit/benefit.get.res.dto";
import { JobBenefitGetResDto } from "@dto/job-benefit/job-benefit.get.res.dto";
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
    jobDesc!: SafeHtml
    benefits!: JobBenefitGetResDto[]

    constructor(
        private title: Title,
        private jobService: JobService,
        private route: ActivatedRoute,
        private sanitize : DomSanitizer
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
            console.log(this.job.companyPhoto)
            this.showDescription()
            this.getJobBenefit()
        })
    }

    showDescription(){
        this.jobDesc = this.sanitize.bypassSecurityTrustHtml(this.job.description)
    }

    getJobBenefit(){
        firstValueFrom(this.jobService.getJobBenefit(this.jobId)).then(result => {
            this.benefits = result
        })
    }

    isBenefit(){
        if(this.benefits!==null){
            return false
        } else {
            return true
        }
    }

}