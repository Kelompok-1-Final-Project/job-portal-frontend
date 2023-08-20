import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BenefitGetResDto } from "@dto/benefit/benefit.get.res.dto";
import { CompanyGetResDto } from "@dto/company/company.get.res.dto";
import { EmploymentTypeGetResDto } from "@dto/job/employment-type.get.res.dto";
import { JobPositionGetResDto } from "@dto/job/job-position.get.res.dto";
import { JobStatusGetResDto } from "@dto/job/job-status.get.res.dto";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { BenefitService } from "@serviceAdmin/benefit.service";
import { CompanyService } from "@serviceAdmin/company.service";
import { JobService } from "@serviceAdmin/job.service";
import { UserService } from "@serviceAdmin/user.service";

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
interface QuestionOptionReqDto {
  optionData: string
  isAnswer: boolean
}
interface QuestionInsertReqDto {
  question: string
  questionOptions?: QuestionOptionReqDto[]
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
  questionInsertDto: QuestionInsertReqDto[] = []
  questionOptionInsertdto: QuestionOptionReqDto[] = []
  
  questionsInsertReqDto = this.fb.group(
    {
      data: this.fb.array(this.questionInsertDto)
    }
    )
    
    status!: JobStatusGetResDto[]
    companies!: CompanyGetResDto[]
    employment!: EmploymentTypeGetResDto[]
    benefits!: BenefitGetResDto[]
    filteredBenefit!: BenefitGetResDto[]
    selectedBenefit: BenefitGetResDto | undefined;
    visibleAssessment = false
    hr!: UserGetResDto[]
    interviewer!: UserGetResDto[]
    position!: JobPositionGetResDto[]

  constructor(private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private jobService: JobService,
    private companyService: CompanyService,
    private benefitService: BenefitService,
    private userService: UserService
  ) {
    this.filteredBenefit = this.benefits
  }

  ngOnInit(): void {
    this.getStatus()
    this.getCompany()
    this.getEmploymentType()
    this.getBenefit()
    this.getHr()
    this.getInterviewer()
    this.getPosition()
  }

  ngAfterViewChecked(): void {

  }

  getStatus(){
    this.jobService.getStatus().subscribe(result => {
      this.status = result
    })
  }

  getCompany(){
    this.companyService.getAll().subscribe(result => {
      this.companies = result
    })
  }

  getEmploymentType(){
    this.jobService.getEmploymentType().subscribe(result => {
      this.employment = result
    })
  }

  getBenefit(){
    this.benefitService.getAll().subscribe(result => {
      this.benefits = result
    })
  }

  getHr(){
    this.userService.getHr().subscribe(result => {
      this.hr = result
    })
  }

  getInterviewer(){
    this.userService.getInterviewer().subscribe(result => {
      this.interviewer = result
    })
  }

  getPosition(){
    this.jobService.getJobPosition().subscribe(result => {
      this.position = result
    })
  }

  get forms() {
    return this.questionsInsertReqDto.get("data") as FormArray
  }

  questionOption(i: number) {
    return this.forms.at(i).get("questionOptions") as FormArray
  }

  onAdd() {
    this.forms.push(this.fb.group({
      question: ['', [Validators.required]],
      questionOptions: this.fb.array(this.questionOptionInsertdto),
    }))
  }

  remove(i: number) {
    this.forms.removeAt(i)
  }

  onAddOption(indexQuestion: number) {
    this.questionOption(indexQuestion).push(this.fb.group({
      optionData: ['', [Validators.required]],
      isAnswer: [false, [Validators.required]]
    }))
  }

  onSubmit() {
    if (this.questionsInsertReqDto.valid) {
      this.loading = true
      const data = this.questionsInsertReqDto.getRawValue().data
    }
  }

  removeOption(indexOption: number, indexQuestion: number) {
    this.questionOption(indexOption).removeAt(indexQuestion)
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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
}