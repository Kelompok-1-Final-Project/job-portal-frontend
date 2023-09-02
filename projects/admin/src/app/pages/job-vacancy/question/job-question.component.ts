import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { QuestionGetResDto } from "@dto/question/question.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";
import { QuestionService } from "@serviceAdmin/question.service";
import { Observable, firstValueFrom } from "rxjs";

@Component({
    selector: 'job-question',
    templateUrl: './job-question.component.html'
})
export class JobQuestionComponent implements OnInit {

    testCode!: string
    listQuestionCode: string[] = []
    listQuestion!: QuestionGetResDto[]
    jobId!: string
    loading: boolean = false

    insertQuestionReqDto = this.fb.group({
        skillTestCode: ['', [Validators.required]],
        questionCode: this.fb.array(this.listQuestionCode)
    })

    constructor(
        private title: Title,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private questionService: QuestionService,
        private jobService: JobService,
        private router: Router
    ) {
        this.title.setTitle('Job Question | Job Portal Admin')
    }

    ngOnInit(): void {
        firstValueFrom(this.route.params).then(param => {
            this.testCode = param['code']
            this.insertQuestionReqDto.get('skillTestCode')?.setValue(this.testCode)
            this.getQuestion()
        })
        firstValueFrom(getParams(this.route, 0)).then(params =>{
            this.jobId = params['id']
        })
    }

    get questionCode(){
        return this.insertQuestionReqDto.get('questionCode') as FormArray
    }

    onAdd(){
        this.questionCode.push(this.fb.control(''))
    }

    removeAt(i:number){
        this.questionCode.removeAt(i)
    }

    getQuestion(){
        firstValueFrom(this.questionService.getAll()).then(result => {
            this.listQuestion = result
        })
    }

    insertQuestion(){
        this.loading = true
        const data = this.insertQuestionReqDto.getRawValue()
        firstValueFrom(this.jobService.insertJobQuestion(data)).then(result =>{
            this.loading = false
            this.router.navigate(['/job-vacancies/details', this.jobId])
        })
    }
}

function getParams(activatedRoute: ActivatedRoute, parentLevel?: number): Observable<Params> {
    let route = activatedRoute
    if (parentLevel) {
        for (let i = 0; i < parentLevel; i++) {
            if (route.parent) {
                route = route.parent
            }
        }
    }
    return route.params
}