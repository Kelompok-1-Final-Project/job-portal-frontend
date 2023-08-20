import {
  Component,
  OnInit
} from '@angular/core';
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

  question: string = 'Apa itu Dependency Injection?';
  // options: string[] = ['Tidak Tau', 'Dependency Injection adalah suautu cara dalam menyediakan object dengan membuatnya sebagai parameter ', 'adalah sebuah framework'];

  id!: string
  questions!: QuestionGetResDto
  listOption!: QuestionOptionResDto[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private questionService: QuestionService
  ) {
    this.title.setTitle('Question Detail | Job Portal Admin')
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
      this.getQuestionById()
      this.listOption = this.questions.optionGetResDtos
    })
  }

  getQuestionById() {
    this.questionService.getDetailQuestionById(this.id).subscribe(result => {
      this.questions = result
    })
  }

  editQuestion(index: number) {
  }

  editOption(index: number) {
  }

  editOptions(id: number) {

  }

}