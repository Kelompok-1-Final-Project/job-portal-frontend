import { Component } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AnswerInsertReqDto } from "@dto/answer/answer.req.dto";
import { OptionTestGetResDtos } from "@dto/answer/question-option.res.dto";
import { QuestionTestGetResDto } from "@dto/answer/question-test.get.res.dto";
import { TestGetResDto } from "@dto/answer/test.get.res.dto";
import { QuestionOptionResDto } from "@dto/question/question-option.res.dto";
import { AuthService } from "@serviceCandidate/auth.service";
import { QuestionService } from "@serviceCandidate/question.service";

@Component({
    selector : 'test.component.html',
    templateUrl : './test.component.html'
})
export class TestComponent{
    // questions = [
    //     {
    //       questionId:1,
    //       question: 'Berapa 2 + 2?',
    //       questionOptions: [
    //         { optionId: 1, optionData: '3' },
    //         { optionId: 2, optionData: '4' },
    //         { optionId: 3, optionData: '5' },
    //         { optionId: 4, optionData: '6' }
    //       ]
    //     },
    //     {
    //       questionId:2,
    //       question: 'Ibu kota perancis?',
    //       questionOptions: [
    //         { optionId: 5, optionData: 'Berlin' },
    //         { optionId: 6, optionData: 'Madrid' },
    //         { optionId: 7, optionData: 'Rome' },
    //         { optionId: 8, optionData: 'Paris' }
    //       ]
    //     }
    //   ];
    test!: TestGetResDto;
    questions!:QuestionTestGetResDto[];
    options : OptionTestGetResDtos[] = []
    candidateId!:string;
    loading = false

    answerQuestion: AnswerInsertReqDto[] = []

    answerCandidateReqDto = this.fb.group({
        skillTestId : [''],
        candidateId:[''],
        answerCandidateReqDtos : this.fb.array(this.answerQuestion)
    })

    constructor(
        private router : Router,
        private authService : AuthService,
        private questionService : QuestionService,
        private fb : NonNullableFormBuilder,
        private title: Title) {
        this.title.setTitle('Answer | Bootest Anggi')
    }

    get answers() {
        return this.answerCandidateReqDto.get("answerCandidateReqDtos") as FormArray
    }

    ngOnInit(){
        this.getData()
    }

    getData(){
        this.questionService.getAll().subscribe(result => {
            this.test = result
            this.candidateId=this.authService.getUserId();            
            this.answerCandidateReqDto.get('skillTestId')?.setValue(result.testId);
            this.answerCandidateReqDto.get('candidateId')?.setValue(this.candidateId);
            for (let i = 0; i < this.test.questionGetResDtos.length; i++){
                this.answers.push(this.fb.group({
                    questionId : [this.test.questionGetResDtos.at(i)?.questionCode],
                    optionId : [null],
                    [`questionOptionIdTemp${i}`]: [],
                }))
            }
        })
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