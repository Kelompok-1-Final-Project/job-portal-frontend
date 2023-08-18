import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AnswerInsertReqDto } from "@dto/answer/answer.req.dto";
import { QuestionOptionResDto } from "@dto/question/question-option.res.dto";
import { QuestionGetResDto } from "@dto/question/question.get.res.dto";
import { ResultInsertReqDto } from "@dto/result/result.insert.req.dto";
import { QuestionService } from "projects/admin/src/app/services/question.service";

@Component({
    selector : 'test.component.html',
    templateUrl : './test.component.html'
})
export class TestComponent{
    questions = [
        {
          questionId:1,
          question: 'Berapa 2 + 2?',
          questionOptions: [
            { optionId: 1, optionData: '3' },
            { optionId: 2, optionData: '4' },
            { optionId: 3, optionData: '5' },
            { optionId: 4, optionData: '6' }
          ]
        },
        {
          questionId:2,
          question: 'Ibu kota perancis?',
          questionOptions: [
            { optionId: 5, optionData: 'Berlin' },
            { optionId: 6, optionData: 'Madrid' },
            { optionId: 7, optionData: 'Rome' },
            { optionId: 8, optionData: 'Paris' }
          ]
        }
      ];
    // questions!:QuestionGetResDto[];
    options : QuestionOptionResDto[] = []

    loading = false

    answerQuestion: AnswerInsertReqDto[] = []

    answerCandidateReqDto = this.fb.group({
        data : this.fb.array(this.answerQuestion)
    })

    constructor(
        private router : Router,
        private questionService : QuestionService,
        private fb : NonNullableFormBuilder,
        private title: Title) {
        this.title.setTitle('Answer | Bootest Anggi')
    }

    get answers() {
        return this.answerCandidateReqDto.get("data") as FormArray
    }

    ngOnInit(){
        this.getData()
    }

    getData(){
        // this.questionService.getAll().subscribe(result => {
        //     this.questions = result
            for (let i = 0; i < this.questions.length; i++){
                this.answers.push(this.fb.group({
                    questionId : [this.questions.at(i)?.questionId],
                    optionId : [null],
                    [`questionOptionIdTemp${i}`]: [],
                    // candidateAssignId : [this.questions.at(i)?.candidateAssignId]
                }))
            }
        // })
    }

    patchOption(e : any, i : number){
        this.answers.at(i).patchValue({
            optionId : e.value
        })
    }

    // getOption(questionId : number){
    //     this.questionService.getOption(questionId).subscribe(result => {
    //         this.options = result
    //     })
    // }

    onSubmit(){
        // if (this.answerCandidateReqDto.valid){
        //     this.loading = true
        //     const data = this.answerCandidateReqDto.getRawValue().data
        //     this.answerService.insert(data).subscribe(result => {
        //         localStorage.clear()
        //         this.router.navigateByUrl('/login')
        //     })
        // }
    }
}