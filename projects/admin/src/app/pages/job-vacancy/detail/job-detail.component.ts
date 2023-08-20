import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { CandidateProgressGetResDto } from "@dto/candidateprogress/candidate-progress.get.res.dto";
import { JobGetResDto } from "@dto/job/job.get.res.dto";
import { StatusProgressGetResDto } from "@dto/progress/status-progress.get.res.dto";
import { TestGetResDto } from "@dto/question/test.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";
import { SkillTestService } from "@serviceAdmin/skilltest.service";
import { StatusProgressService } from "@serviceAdmin/statusprogress.service";

@Component({
    selector: 'job-detail',
    templateUrl: 'job-detail.component.html'
})
export class JobDetailComponent implements OnInit {

    id!: string
    job!: JobGetResDto
    candidates!: CandidateProgressGetResDto[]
    status!: StatusProgressGetResDto[]
    test!: TestGetResDto

    constructor(
        private title: Title,
        private route: ActivatedRoute,
        private jobService: JobService,
        private statusProgressService: StatusProgressService,
        private skillTestService: SkillTestService
    ) {
        this.title.setTitle('Job Detail | Job Portal Admin')
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id']
            this.getJobById()
            this.getCandidateStatus()
            this.getStatus()
            this.getSkillTest()
            console.log(`${this.test.questionGetResDtos[0].question} = testing`)
        })
    }

    getSkillTest(){
        this.skillTestService.getTest(this.id).subscribe(result =>{
            this.test = result
        })
    }

    getJobById(){
        this.jobService.getById(this.id).subscribe(result =>{
            this.job = result
        })
    }

    getCandidateStatus(){
        this.statusProgressService.getCandidateStatus().subscribe(result =>{
            this.candidates = result
        })
    }

    getStatus(){
        this.statusProgressService.getStatus().subscribe(result => {
            this.status = result           
        })
    }
}