import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionOptionResDto } from '@dto/question/question-option.res.dto';
import { QuestionGetResDto } from '@dto/question/question.get.res.dto';
import { QuestionService } from '@serviceAdmin/question.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {

  id!: string
  questions!: QuestionGetResDto
  listOption!: QuestionOptionResDto[]
  visibleUpdateQuestion: boolean = false
  visibleOption: boolean = false
  keyAnswer = [
    { name: 'False', value: false },
    { name: 'True', value: true }
]

  questionUpdateReqDto = this.fb.group({
    questionId: ['', [Validators.required]],
    question: ['', [Validators.required]]
  })

  optionUpdateReqDto = this.fb.group({
    optionId: ['', [Validators.required]],
	  labels: ['', [Validators.required]],
    isAnswer: [false, [Validators.required]]
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private questionService: QuestionService,
    private fb: NonNullableFormBuilder
  ) {
    this.title.setTitle('Question Detail | Job Portal Admin')
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getQuestionById()
    })
  }

  getQuestionById() {
    this.questionService.getDetailQuestionById(this.id).subscribe(result => {
      console.log(result)
      this.questions = result
    })
  }

  editQuestion(id: string) {
    this.questionUpdateReqDto.get('questionId')?.setValue(id)
    this.visibleUpdateQuestion = true
  }

  updateQuestion() {
    const data = this.questionUpdateReqDto.getRawValue()
    firstValueFrom(this.questionService.update(data)).then(result => {
      this.router.navigateByUrl('/questions')
    })
  }

  editOption(id: string) {
    this.optionUpdateReqDto.get('optionId')?.setValue(id)
    this.visibleOption = true
  }

  updateOption(){
    const data = this.optionUpdateReqDto.getRawValue()
    firstValueFrom(this.questionService.updateOption(data)).then(result => {
      this.visibleOption = false
    })
  }
}