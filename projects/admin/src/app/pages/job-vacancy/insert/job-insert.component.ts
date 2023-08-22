import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BenefitGetResDto } from "@dto/benefit/benefit.get.res.dto";
import { CompanyGetResDto } from "@dto/company/company.get.res.dto";
import { EmploymentTypeGetResDto } from "@dto/job/employment-type.get.res.dto";
import { JobPositionGetResDto } from "@dto/job/job-position.get.res.dto";
import { JobStatusGetResDto } from "@dto/job/job-status.get.res.dto";
import { QuestionOptionReqDto } from "@dto/question/question-option.req.dto";
import { QuestionGetResDto } from "@dto/question/question.get.res.dto";
import { QuestionInsertReqDto } from "@dto/question/question.insert.req.dto";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { BenefitService } from "@serviceAdmin/benefit.service";
import { CompanyService } from "@serviceAdmin/company.service";
import { JobService } from "@serviceAdmin/job.service";
import { QuestionService } from "@serviceAdmin/question.service";
import { UserService } from "@serviceAdmin/user.service";

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'job-insert',
  templateUrl: './job-insert.component.html'
})
export class JobInsertComponent implements AfterViewChecked {

  loading = false
  text: string | undefined;
  keyAnswer = [
    { name: 'True', value: true },
    { name: 'False', value: false }
  ]

  status!: JobStatusGetResDto[]
  companies!: CompanyGetResDto[]
  employment!: EmploymentTypeGetResDto[]
  benefits!: BenefitGetResDto[]
  filteredBenefit!: BenefitGetResDto[]
  visibleAssessment = false
  hr!: UserGetResDto[]
  interviewer!: UserGetResDto[]
  position!: JobPositionGetResDto[]
  code: string[] = []
  visibleTest: boolean = false
  questions!: QuestionGetResDto[]
  questionId: string[] = []
  listBenefit: any[] = []

  jobInsertReqDto = this.fb.group({
    jobTitle: [''],
    salaryStart: [0],
    salaryEnd: [0],
    description: [''],
    endDate: [''],
    companyCode: [''],
    jobPositionCode: [''],
    jobStatusCode: [''],
    employmentCode: [''],
    hrId: [''],
    interviewerId: [''],
    benefitCode: this.fb.array(this.code),
    testName: [''],
    questionId: this.fb.array(this.questionId)
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private jobService: JobService,
    private companyService: CompanyService,
    private benefitService: BenefitService,
    private userService: UserService,
    private questionService: QuestionService
  ) {
    this.filteredBenefit = this.benefits,
      this.title.setTitle('Insert Job | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getStatus()
    this.getCompany()
    this.getEmploymentType()
    this.getBenefit()
    this.getHr()
    this.getInterviewer()
    this.getPosition()
    this.getQuestion()
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges()
  }

  getStatus() {
    this.jobService.getStatus().subscribe(result => {
      this.status = result
    })
  }

  getCompany() {
    this.companyService.getAll().subscribe(result => {
      this.companies = result
    })
  }

  getEmploymentType() {
    this.jobService.getEmploymentType().subscribe(result => {
      this.employment = result
    })
  }

  getBenefit() {
    this.benefitService.getAll().subscribe(result => {
      this.benefits = result
    })
  }

  getHr() {
    this.userService.getHr().subscribe(result => {
      this.hr = result
    })
  }

  getInterviewer() {
    this.userService.getInterviewer().subscribe(result => {
      this.interviewer = result
    })
  }

  getPosition() {
    this.jobService.getJobPosition().subscribe(result => {
      this.position = result
    })
  }

  filterBenefit(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.benefits as any[]).length; i++) {
      let benefit = (this.benefits as any[])[i];
      if (benefit.benefitName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(benefit);
      }
    }
    this.filteredBenefit = filtered;
  }

  insertAll() {
    const data = this.jobInsertReqDto.getRawValue()
    this.jobService.insertJob(data).subscribe(result => {
      this.router.navigateByUrl('/job-vacancies')
    })
  }

  changeSwitch() {

  }

  getQuestion() {
    this.questionService.getAll().subscribe(result => {
      this.questions = result
    })
  }

  get questionList() {
    return this.jobInsertReqDto.get('questionId') as FormArray
  }

  onAdd() {
    this.questionList.push(this.fb.control(''))
  }

  remove(i: number) {
    this.questionList.removeAt(i)
  }

  get benefitList() {
    return this.jobInsertReqDto.get('benefitCode') as FormArray
  }

  benefit(event: any) {
    this.benefitList.clear()
    for (let i = 0; i < event.length; i++) {
      this.benefitList.push(this.fb.control(event[i].benefitCode))
    }
  }

  isVisible(){
    return this.visibleTest
  }

  changeChecked(){
    this.visibleTest = true
  }

  setQuestion(value : any){
    return this.visibleTest = value
  }
}