import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

interface QuestionOptionReqDto {
	optionData : string
	isAnswer : boolean
}

interface QuestionInsertReqDto {
	question : string
	questionOptions? : QuestionOptionReqDto[]
}

@Component({
    selector : 'question-insert',
    templateUrl : './question-insert.component.html'
})
export class QuestionInsertComponent implements OnInit{

    loading = false

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

    constructor (
        private fb: NonNullableFormBuilder,
        private cd : ChangeDetectorRef,
        private router : Router,
        private title:Title
    ){
        this.title.setTitle('Create Question | InLook Info Looker')
    }

    ngOnInit(): void {
        // this.getType()
    }

    ngAfterViewChecked(): void {
        //this.cd.detectChanges()
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

    patchTypeId(e : any, i : number){
        this.forms.at(i).patchValue({
            typeId : e.value
        })
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

    removeOption(indexOption: number, indexQuestion: number) {
        this.questionOption(indexQuestion).removeAt(indexOption)
    }

    onSubmit() {
        if (this.questionsInsertReqDto.valid) {
            this.loading = true
            const data = this.questionsInsertReqDto.getRawValue().data
        }
    }
}