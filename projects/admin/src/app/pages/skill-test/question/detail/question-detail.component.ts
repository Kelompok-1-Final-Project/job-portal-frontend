import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionOptionResDto } from '@dto/question/question-option.res.dto';
import { QuestionGetResDto } from '@dto/question/question.get.res.dto';
import { QuestionService } from '@serviceAdmin/question.service';

@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {

  id!: string
  questions!: QuestionGetResDto
  listOption!: QuestionOptionResDto[]
  visibleUpdateQuestion: boolean = false

  questionUpdateReqDto = this.fb.group({
    questionId: ['', [Validators.required]],
    question: ['', [Validators.required]]
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
    // this.questionService.
  }

  editOption(index: number) {

  }

}