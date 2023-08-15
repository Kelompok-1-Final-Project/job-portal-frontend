import { Component, OnInit } from '@angular/core';

@Component({
    selector : 'test-list',
    templateUrl : './test-list.component.html'
})
export class TestListComponent implements OnInit{
  visibleAdd:boolean = false;
  visibleUpdate:boolean = false;
  visibleDelete:boolean = false;
    constructor(){}
    benefits = [
      {
        jobName: 'Fullstack Developer',
        testName: 'Java & Typescript Test',
      },
      {
        jobName: 'Backend Developer',
        testName: 'Java Test',
      },
      {
        jobName: 'Frontend Developer',
        testName: 'Typescript',
      },
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