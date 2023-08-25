import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { EmploymentTypeGetResDto } from "@dto/job/employment-type.get.res.dto";
import { JobAdminGetResDto } from "@dto/job/job-admin.get.res.dto";
import { JobPositionGetResDto } from "@dto/job/job-position.get.res.dto";
import { JobStatusGetResDto } from "@dto/job/job-status.get.res.dto";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";
import { UserService } from "@serviceAdmin/user.service";
import { firstValueFrom } from "rxjs";


@Component({
  selector: 'job-update',
  templateUrl: './job-update.component.html'
})
export class JobUpdateComponent implements AfterViewChecked {

  job!: JobAdminGetResDto
  jobId!: string
  positions!: JobPositionGetResDto[]
  status!: JobStatusGetResDto[]
  employment!: EmploymentTypeGetResDto[]
  hr!: UserGetResDto[]
  interviewer!: UserGetResDto[]

  jobUpdateReqDto = this.fb.group({
    jobId: ['', [Validators.required]],
    jobCode: ['', [Validators.required]],
    jobTitle: ['', [Validators.required]],
    salaryStart: [0, [Validators.required]],
    salaryEnd: [0, [Validators.required]],
    description: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    jobPositionCode: ['', [Validators.required]],
    jobStatusCode: ['', [Validators.required]],
    employmentTypeCode: ['', [Validators.required]],
    hrId: ['', [Validators.required]],
    interviewerId: ['', [Validators.required]]
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private jobService: JobService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.title.setTitle('Update Job | Job Portal Admin')
  }

  ngOnInit(): void {
    firstValueFrom(this.route.params).then(param => {
      this.jobId = param['id']
      this.jobUpdateReqDto.get('jobId')?.setValue(this.jobId)
      this.getJobById()
    })
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges()
  }

  getJobById() {
    firstValueFrom(this.jobService.getById(this.jobId)).then(result => {
      this.job = result
      this.getPosition()
      this.getStatus()
      this.getEmploymentType()
      this.getHr()
      this.getInterviewer()
      this.jobUpdateReqDto.get('jobCode')?.setValue(this.job.jobCode)
    })
  }

  getPosition() {
    firstValueFrom(this.jobService.getJobPosition()).then(result => {
      this.positions = result
    })
  }

  getStatus() {
    firstValueFrom(this.jobService.getStatus()).then(result => {
      this.status = result
    })
  }

  getEmploymentType() {
    firstValueFrom(this.jobService.getEmploymentType()).then(result => {
      this.employment = result
    })
  }

  getHr() {
    firstValueFrom(this.userService.getHr()).then(result => {
      this.hr = result
    })
  }

  getInterviewer() {
    firstValueFrom(this.userService.getInterviewer()).then(result => {
      this.interviewer = result
    })
  }

  updateJob() {
    const data = this.jobUpdateReqDto.getRawValue()
    firstValueFrom(this.jobService.update(data)).then(result => {
      this.router.navigateByUrl('/job-vacancies')
    })
  }
} 