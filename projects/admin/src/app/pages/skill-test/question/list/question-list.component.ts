import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuestionGetResDto } from '@dto/question/question.get.res.dto';
import { QuestionService } from '@serviceAdmin/question.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {
  visibleAdd: boolean = false;
  visibleUpdate: boolean = false;
  visibleDelete: boolean = false;
  questions!: QuestionGetResDto[]

  constructor(
    private title: Title,
    private questionService: QuestionService
  ) {
    this.title.setTitle('Question | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getAllQuestion()
  }

  getAllQuestion() {
    firstValueFrom(this.questionService.getAll()).then(result => {
      this.questions = result
    })
  }

  // add() {
  //   this.visibleAdd = true;
  // }

  // update(id: number) {
  //   this.visibleUpdate = true;
  // }

  // deleteModal(id: number) {
  //   this.visibleDelete = true;
  // }

  // confirmDelete() {

  // }

}