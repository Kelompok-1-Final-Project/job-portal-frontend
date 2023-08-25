import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { ProgressStatus } from "@constant/progress.enum";
import { CandidateProgressGetResDto } from "@dto/candidateprogress/candidate-progress.get.res.dto";
import { JobAdminGetResDto } from "@dto/job/job-admin.get.res.dto";
import { StatusProgressGetResDto } from "@dto/progress/status-progress.get.res.dto";
import { TestGetResDto } from "@dto/question/test.get.res.dto";
import { ResultGetResDto } from "@dto/result/result.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";
import { SkillTestService } from "@serviceAdmin/skilltest.service";
import { StatusProgressService } from "@serviceAdmin/statusprogress.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html'
})
export class JobDetailComponent implements OnInit, AfterViewChecked {

    id!: string
    job!: JobAdminGetResDto
    candidates!: CandidateProgressGetResDto[]
    status!: StatusProgressGetResDto[]
    test!: TestGetResDto
    results!: ResultGetResDto[]
    visibleAssessment: boolean = false
    visibleInterview: boolean = false
    visibleMcu: boolean = false
    visibleOffering: boolean = false
    visibleHired: boolean = false
    visibleRejected: boolean = false
    visibleDeleteQuestion: boolean = false
    testCode!: string
    questionCode!: string

    assessmentInsertReqDto = this.fb.group({
        candidateId: ['', [Validators.required]],
        jobId: ['', [Validators.required]],
        hrId: ['', [Validators.required]],
        schedule: ['', [Validators.required]]
    })

    interviewInsertReqDto = this.fb.group({
        candidateId: ['', [Validators.required]],
        jobId: ['', [Validators.required]],
        interviewerId: ['', [Validators.required]],
        schedule: ['', [Validators.required]]
    })

    medicalcheckupInsertReqDto = this.fb.group({
        candidateId: ['', [Validators.required]],
        jobId: ['', [Validators.required]],
        ext: ['', [Validators.required]],
        file: ['', [Validators.required]]
    })

    offeringInsertReqDto = this.fb.group({
        candidateId: ['', [Validators.required]],
        jobId: ['', [Validators.required]]
    })

    hiredInsertReqDto = this.fb.group({
        candidateId: ['', [Validators.required]],
        jobId: ['', [Validators.required]]
    })

    rejectedInsertReqDto = this.fb.group({
        candidateProgressId: ['', [Validators.required]],
        statusProcessCode: ['', [Validators.required]]
    })

    constructor(
        private title: Title,
        private route: ActivatedRoute,
        private jobService: JobService,
        private statusProgressService: StatusProgressService,
        private skillTestService: SkillTestService,
        private fb: NonNullableFormBuilder,
        private cd: ChangeDetectorRef
    ) {
        this.title.setTitle('Job Detail | Job Portal Admin')
    }

    ngOnInit(): void {
        firstValueFrom(this.route.params).then(params => {
            this.id = params['id']
            this.getJobById()
            this.getStatus()
            this.getSkillTest()
            this.getResult()
        })
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    getSkillTest() {
        this.skillTestService.getTest(this.id).subscribe(result => {
            this.test = result
        })
    }

    getJobById() {
        this.jobService.getById(this.id).subscribe(result => {
            this.job = result
            this.getCandidateStatus()
        })
    }

    getCandidateStatus() {
        this.statusProgressService.getCandidateByJob(this.job.jobCode).subscribe(result => {
            this.candidates = result
        })
    }

    getStatus() {
        this.statusProgressService.getStatus().subscribe(result => {
            this.status = result
        })
    }

    getResult() {
        this.skillTestService.getResult(this.id).subscribe(result => {
            this.results = result
        })
    }

    changeStatus(code: string, candidateId: string, progressId: string) {
        if (code == ProgressStatus.ASSESSMENT) {
            this.visibleAssessment = true
            this.assessmentInsertReqDto.get('hrId')?.setValue(this.job.hrId)
            this.assessmentInsertReqDto.get('candidateId')?.setValue(candidateId)
            this.assessmentInsertReqDto.get('jobId')?.setValue(this.job.id)
        } else if (code == ProgressStatus.INTERVIEW) {
            this.visibleInterview = true
            this.interviewInsertReqDto.get('candidateId')?.setValue(candidateId)
            this.interviewInsertReqDto.get('jobId')?.setValue(this.job.id)
            this.interviewInsertReqDto.get('interviewerId')?.setValue(this.job.interviewerId)
        } else if (code == ProgressStatus.MEDICAL) {
            this.visibleMcu = true
            this.medicalcheckupInsertReqDto.get('candidateId')?.setValue(candidateId)
            this.medicalcheckupInsertReqDto.get('jobId')?.setValue(this.job.id)
        } else if (code == ProgressStatus.OFFERING) {
            this.visibleOffering = true
            this.offeringInsertReqDto.get('candidateId')?.setValue(candidateId)
            this.offeringInsertReqDto.get('jobId')?.setValue(this.job.id)
        } else if (code == ProgressStatus.HIRED) {
            this.visibleHired = true
            this.hiredInsertReqDto.get('candidateId')?.setValue(candidateId)
            this.hiredInsertReqDto.get('jobId')?.setValue(this.job.id)
        } else if (code == ProgressStatus.REJECTED) {
            this.visibleRejected = true
            this.rejectedInsertReqDto.get('candidateProgressId')?.setValue(progressId)
            this.rejectedInsertReqDto.get('statusProcessCode')?.setValue(code)
        }
    }

    insertAssessment() {
        const data = this.assessmentInsertReqDto.getRawValue()
        this.statusProgressService.insertAssessment(data).subscribe(result => {
            this.visibleAssessment = false
        })
    }

    insertInterview() {
        const data = this.interviewInsertReqDto.getRawValue()
        this.statusProgressService.insertInterview(data).subscribe(result => {
            this.visibleInterview = false
        })
    }

    insertMcu() {
        const data = this.medicalcheckupInsertReqDto.getRawValue()
        this.statusProgressService.insertMedicalCheckup(data).subscribe(result => {
            this.visibleMcu = false
        })
    }

    insertOffering() {
        const data = this.offeringInsertReqDto.getRawValue()
        this.statusProgressService.insertOffering(data).subscribe(result => {
            this.visibleOffering = false
        })
    }

    insertHired() {
        const data = this.hiredInsertReqDto.getRawValue()
        this.statusProgressService.insertHired(data).subscribe(result => {
            this.visibleHired = false
        })
    }

    insertRejected() {
        const data = this.rejectedInsertReqDto.getRawValue()
        this.statusProgressService.updateReject(data).subscribe(result => {
            this.visibleRejected = false
        })
    }

    cancelMcu() {
        this.visibleMcu = false
    }

    cancelOffering() {
        this.visibleOffering = false
    }

    cancelHired() {
        this.visibleHired = false
    }

    cancelRejected() {
        this.visibleRejected = false
    }

    questionModal(){
        this.visibleDeleteQuestion = true
    }

    cancelDeleteQuestion(){
        this.visibleDeleteQuestion = false
    }

    deleteQuestionJob(){
        firstValueFrom(this.jobService.deleteQuestion(this.testCode, this.questionCode)).then(result => {
            this.visibleDeleteQuestion = false
        })
    }
}