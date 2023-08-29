import { AfterViewChecked, ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BenefitGetResDto } from "@dto/benefit/benefit.get.res.dto";
import { CompanyGetResDto } from "@dto/company/company.get.res.dto";
import { EmploymentTypeGetResDto } from "@dto/job/employment-type.get.res.dto";
import { JobPositionGetResDto } from "@dto/job/job-position.get.res.dto";
import { JobStatusGetResDto } from "@dto/job/job-status.get.res.dto";
import { QuestionGetResDto } from "@dto/question/question.get.res.dto";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { BenefitService } from "@serviceAdmin/benefit.service";
import { CompanyService } from "@serviceAdmin/company.service";
import { JobService } from "@serviceAdmin/job.service";
import { QuestionService } from "@serviceAdmin/question.service";
import { UserService } from "@serviceAdmin/user.service";
import { firstValueFrom } from "rxjs";

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
  cleanText!: string

  jobInsertReqDto = this.fb.group({
    jobTitle: ['', [Validators.required]],
    salaryStart: [0, [Validators.required]],
    salaryEnd: [0, [Validators.required]],
    description: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    companyCode: ['', [Validators.required]],
    jobPositionCode: ['', [Validators.required]],
    jobStatusCode: ['', [Validators.required]],
    employmentCode: ['', [Validators.required]],
    hrId: ['', [Validators.required]],
    interviewerId: ['', [Validators.required]],
    benefitCode: this.fb.array(this.code),
    testName: ['', [Validators.required]],
    questionId: this.fb.array(this.questionId)
  })

  @ViewChild('editor', {static:false}) editor: any

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
    firstValueFrom(this.jobService.getStatus()).then(result => {
      this.status = result
    })
  }

  getCompany() { 
    firstValueFrom(this.companyService.getAll()).then(result => {
      this.companies = result
    })
  }

  getEmploymentType() {
    firstValueFrom(this.jobService.getEmploymentType()).then(result => {
      this.employment = result
    })
  }

  getBenefit() {
    firstValueFrom(this.benefitService.getAll()).then(result => {
      this.benefits = result
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

  getPosition() {
    firstValueFrom(this.jobService.getJobPosition()).then(result => {
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
    this.jobInsertReqDto.get('description')?.setValue(this.cleanText)
    const data = this.jobInsertReqDto.getRawValue()
    firstValueFrom(this.jobService.insertJob(data)).then(result => {
      this.router.navigateByUrl('/job-vacancies')
    })
  }

  changeSwitch() {

  }

  getQuestion() {
    firstValueFrom(this.questionService.getAll()).then(result => {
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

  cleanString(){
    this.cleanText = this.editor.el.nativeElement.innerText
  }
}