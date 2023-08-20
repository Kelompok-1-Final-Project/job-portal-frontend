import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { JobGetResDto } from "@dto/job/job.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";

@Component({
    selector: 'job-detail',
    templateUrl: 'job-detail.component.html'
})
export class JobDetailComponent implements OnInit {

    id!: string
    job!: JobGetResDto

    constructor(
        private title: Title,
        private route: ActivatedRoute,
        private jobService: JobService
    ) {
        this.title.setTitle('Job Detail | Job Portal Admin')
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id']
            this.getJobById()
        })
    }

    getSkillTest(){
        
    }

    getJobById(){
        this.jobService.getById(this.id).subscribe(result =>{
            this.job = result
        })
    }
}