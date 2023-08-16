import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuestionGetResDto } from '@dto/question/question.get.res.dto';
import { QuestionService } from 'projects/admin/src/app/services/question.service';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html'
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

  getAllQuestion(){
    this.questionService.getAll().subscribe(result => {
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