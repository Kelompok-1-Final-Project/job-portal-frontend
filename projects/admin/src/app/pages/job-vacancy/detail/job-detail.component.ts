import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { DomSanitizer, SafeHtml, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ProgressStatus } from "@constant/progress.enum";
import { BenefitGetResDto } from "@dto/benefit/benefit.get.res.dto";
import { CandidateProgressGetResDto } from "@dto/candidateprogress/candidate-progress.get.res.dto";
import { JobBenefitGetResDto } from "@dto/job-benefit/job-benefit.get.res.dto";
import { JobAdminGetResDto } from "@dto/job/job-admin.get.res.dto";
import { StatusProgressGetResDto } from "@dto/progress/status-progress.get.res.dto";
import { TestGetResDto } from "@dto/question/test.get.res.dto";
import { ResultGetResDto } from "@dto/result/result.get.res.dto";
import { BenefitService } from "@serviceAdmin/benefit.service";
import { JobService } from "@serviceAdmin/job.service";
import { SkillTestService } from "@serviceAdmin/skilltest.service";
import { StatusProgressService } from "@serviceAdmin/statusprogress.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit, AfterViewChecked {

    id!: string
    job: JobAdminGetResDto | undefined
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
    benefits!: JobBenefitGetResDto[]
    visibleBenefit: boolean = false
    benefitCode!: string
    jobCode!: string
    visibleAddBenefit: boolean = false
    listBenefits!: BenefitGetResDto[]
    visibleUpdateNotes: boolean = false
    visibleButtonNotes: boolean = false
    sanitizedContent!: SafeHtml
    disAssessment: boolean = false
    disInterview: boolean = false
    disMedicalCheckup: boolean = false
    disOffering: boolean = false
    disHired: boolean = false
    loading: boolean = false

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

    jobBenefitInsertReqDto = this.fb.group({
        jobId: ['', [Validators.required]],
        benefitId: ['', [Validators.required]]
    })

    interviewUpdateReqDto = this.fb.group({
        interviewId: ['', [Validators.required]],
        notes: ['', [Validators.required]]
    })

    constructor(
        private title: Title,
        private route: ActivatedRoute,
        private jobService: JobService,
        private statusProgressService: StatusProgressService,
        private skillTestService: SkillTestService,
        private fb: NonNullableFormBuilder,
        private cd: ChangeDetectorRef,
        private benefitService: BenefitService,
        private sanitizer: DomSanitizer,
        private router: Router
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
            this.getJobBenefit()
            this.getAllBenefit()
            this.isQuestion()
        })
    }

    ngAfterViewChecked(): void {
        this.cd.detectChanges()
    }

    getSkillTest() {
        firstValueFrom(this.skillTestService.getTest(this.id)).then(result => {
            this.test = result
        })
    }

    getJobById() {
        firstValueFrom(this.jobService.getById(this.id)).then(result => {
            this.job = result
            this.getCandidateStatus()
            this.showOriginalContent()
        })
    }

    getCandidateStatus() {
        if(this.job){
            firstValueFrom(this.statusProgressService.getCandidateByJob(this.job?.id)).then(result => {
                this.candidates = result
            })
        }
    }

    getStatus() {
        firstValueFrom(this.statusProgressService.getStatus()).then(result => {
            this.status = result
        })
    }

    getResult() {
        firstValueFrom(this.skillTestService.getResult(this.id)).then(result => {
            this.results = result
        })
    }

    changeStatus(code: string, candidateId: string, progressId: string) {
        if (code == ProgressStatus.ASSESSMENT) {
            this.visibleAssessment = true
            this.assessmentInsertReqDto.patchValue({
                hrId: this.job?.hrId,
                candidateId: candidateId,
                jobId: this.job?.id
            })
        } else if (code == ProgressStatus.INTERVIEW) {
            this.visibleInterview = true
            this.interviewInsertReqDto.patchValue({
                candidateId: candidateId,
                jobId: this.job?.id,
                interviewerId: this.job?.interviewerId
            })
        } else if (code == ProgressStatus.MEDICAL) {
            this.visibleMcu = true
            this.medicalcheckupInsertReqDto.patchValue({
                candidateId: candidateId,
                jobId: this.job?.id
            })
        } else if (code == ProgressStatus.OFFERING) {
            this.visibleOffering = true
            this.offeringInsertReqDto.patchValue({
                candidateId: candidateId,
                jobId: this.job?.id
            })
        } else if (code == ProgressStatus.HIRED) {
            this.visibleHired = true
            this.hiredInsertReqDto.patchValue({
                candidateId: candidateId,
                jobId: this.job?.id
            })
        } else if (code == ProgressStatus.REJECTED) {
            this.visibleRejected = true
            this.rejectedInsertReqDto.patchValue({
                candidateProgressId: progressId,
                statusProcessCode: code
            })
        }
    }

    insertAssessment() {
        this.disAssessment = true
        const data = this.assessmentInsertReqDto.getRawValue()
        firstValueFrom(this.statusProgressService.insertAssessment(data)).then(result => {
            this.visibleAssessment = false
            this.disAssessment = false
            this.getCandidateStatus()
        })
    }

    insertInterview() {
        this.disInterview = true
        const data = this.interviewInsertReqDto.getRawValue()
        firstValueFrom(this.statusProgressService.insertInterview(data)).then(result => {
            this.visibleInterview = false
            this.disInterview = false
            this.getCandidateStatus()
        })
    }

    insertMcu() {
        this.disMedicalCheckup = true
        const data = this.medicalcheckupInsertReqDto.getRawValue()
        firstValueFrom(this.statusProgressService.insertMedicalCheckup(data)).then(result => {
            this.visibleMcu = false
            this.disMedicalCheckup = false
            this.getCandidateStatus()
        })
    }

    insertOffering() {
        this.disOffering = true
        const data = this.offeringInsertReqDto.getRawValue()
        firstValueFrom(this.statusProgressService.insertOffering(data)).then(result => {
            this.visibleOffering = false
            this.disOffering = false
            this.getCandidateStatus()
        })
    }

    insertHired() {
        this.disOffering = true
        const data = this.hiredInsertReqDto.getRawValue()
        firstValueFrom(this.statusProgressService.insertHired(data)).then(result => {
            this.visibleHired = false
            this.disHired = false
            this.getCandidateStatus()
        })
    }

    insertRejected() {
        this.loading = true
        const data = this.rejectedInsertReqDto.getRawValue()
        firstValueFrom(this.statusProgressService.updateReject(data)).then(result => {
            this.loading = false
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

    questionModal(skillTest: string, question: string) {
        this.visibleDeleteQuestion = true
        this.testCode = skillTest
        this.questionCode = question
    }

    cancelDeleteQuestion() {
        this.visibleDeleteQuestion = false
    }

    deleteQuestionJob() {
        firstValueFrom(this.jobService.deleteQuestion(this.testCode, this.questionCode)).then(result => {
            this.visibleDeleteQuestion = false
        })
    }

    getJobBenefit() {
        firstValueFrom(this.jobService.getJobBenefit(this.id)).then(result => {
            this.benefits = result
        })
    }

    deleteBenefit(job: any, benefit: string) {
        this.visibleBenefit = true
        this.jobCode = job
        this.benefitCode = benefit
    }

    cancelDeleteBenefit() {
        this.visibleBenefit = false
    }

    deleteJobBenefit() {
        this.loading = true
        firstValueFrom(this.jobService.deleteJobBenefit(this.jobCode, this.benefitCode)).then(result => {
            this.loading = false
            this.visibleBenefit = false
        })
    }

    getAllBenefit() {
        firstValueFrom(this.benefitService.getAll()).then(result => {
            this.listBenefits = result
        })
    }

    addJobBenefit() {
        this.visibleAddBenefit = true
        this.jobBenefitInsertReqDto.get('jobId')?.setValue(this.id)
    }

    insertJobBenefit() {
        this.loading = true
        const data = this.jobBenefitInsertReqDto.getRawValue()
        firstValueFrom(this.jobService.insertJobBenefit(data)).then(result => {
            this.loading = false
            this.visibleAddBenefit = false
            this.router.navigate(['/job-vacancies/details/', this.id])
        })
    }

    isQuestion() {
        return this.test != null
    }

    showOriginalContent() {
        if(this.job){
            this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.job?.description)
        }
    }
}