import { Component, OnInit } from '@angular/core';

@Component({
    selector : 'question-list',
    templateUrl : './question-list.component.html'
})
export class QuestionListComponent implements OnInit{
  visibleAdd:boolean = false;
  visibleUpdate:boolean = false;
  visibleDelete:boolean = false;
    constructor(){}

     questions = [
    {
      id: 1,
      question: 'Apa itu Java?'
    },
    {
      id: 2,
      question: 'Apa itu Spring Framework?'
    },
    {
      id: 3,
      question: 'Apa itu Angular?'
    },
    {
      id: 4,
      question: 'Apa itu Spring Boot?'
    },
    {
      id: 5,
      question: 'Apa itu Dependency Injection?'
    }
  ];
    ngOnInit(): void {
    }

    add(){
      this.visibleAdd=true;
    }
    update(id:number){
      this.visibleUpdate=true;
    }

    deleteModal(id:number){
      this.visibleDelete=true;
    }

    confirmDelete(){
      
    }

  }