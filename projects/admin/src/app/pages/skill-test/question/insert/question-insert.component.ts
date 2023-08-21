import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { QuestionOptionReqDto } from "@dto/question/question-option.req.dto";
import { QuestionInsertReqDto } from "@dto/question/question.insert.req.dto";
import { QuestionService } from "@serviceAdmin/question.service";

@Component({
    selector: 'question-insert',
    templateUrl: './question-insert.component.html'
})
export class QuestionInsertComponent implements OnInit {

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

    constructor(
        private fb: NonNullableFormBuilder,
        private cd: ChangeDetectorRef,
        private router: Router,
        private title: Title,
        private questionService: QuestionService
    ) {
        this.title.setTitle('Create Question | InLook Info Looker')
    }

    ngOnInit(): void {

    }

    get forms() {
        return this.questionsInsertReqDto.get("data") as FormArray
    }

    questionOption(i: number) {
        return this.forms.at(i).get("listQuestionOption") as FormArray
    }

    onAdd() {
        this.forms.push(this.fb.group({
            question: ['', [Validators.required]],
            listQuestionOption: this.fb.array(this.questionOptionInsertdto),
        }))
    }

    patchTypeId(e: any, i: number) {
        this.forms.at(i).patchValue({
            typeId: e.value
        })
    }

    remove(i: number) {
        this.forms.removeAt(i)
    }

    onAddOption(indexQuestion: number) {
        this.questionOption(indexQuestion).push(this.fb.group({
            labels: ['', [Validators.required]],
            isAnswer: [false, [Validators.required]]
        }))
    }

    removeOption(indexOption: number, indexQuestion: number) {
        this.questionOption(indexOption).removeAt(indexQuestion)
    }

    onSubmit() {
        if (this.questionsInsertReqDto.valid) {
            this.loading = true
            const data = this.questionsInsertReqDto.getRawValue().data
            this.questionService.insert(data).subscribe(result => {
                this.router.navigateByUrl('/questions')
            })
        }
    }
}