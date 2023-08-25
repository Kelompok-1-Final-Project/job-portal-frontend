import { Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionGetResDto } from "@dto/question/question.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";
import { QuestionService } from "@serviceAdmin/question.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'job-question',
    templateUrl: './job-question.component.html'
})
export class JobQuestionComponent implements OnInit {

    testCode!: string
    listQuestionCode: string[] = []
    listQuestion!: QuestionGetResDto[]

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
            this.testCode = param['id']
            this.insertQuestionReqDto.get('skillTestCode')?.setValue(this.testCode)
            this.getQuestion()
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
        const data = this.insertQuestionReqDto.getRawValue()
        firstValueFrom(this.jobService.insertJobQuestion(data)).then(result =>{
            this.router.navigateByUrl('/job-vacancies')
        })
    }
}