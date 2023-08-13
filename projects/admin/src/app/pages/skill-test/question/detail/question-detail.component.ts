import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.component.html'
})
export class QuestionDetailComponent implements OnInit {
 
  constructor() {}

  question: string = 'Apa itu Dependency Injection?';
  options: string[] = ['Tidak Tau', 'Dependency Injection adalah suautu cara dalam menyediakan object dengan membuatnya sebagai parameter ', 'adalah sebuah framework'];

  editQuestion(index: number) {
  }
  editOption(index: number) {
  }
  ngOnInit(): void {}

  editOptions(id: number) {
    // Logika untuk mengedit opsi jawaban
  }

}