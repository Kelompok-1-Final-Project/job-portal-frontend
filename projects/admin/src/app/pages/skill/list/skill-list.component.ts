import { Component, OnInit } from '@angular/core';

interface Skills {
  skillCode: string;
  skillName: string;
}

@Component({
    selector : 'skill-list',
    templateUrl : './skill-list.component.html'
})
export class SkillListComponent implements OnInit{
  visibleAdd:boolean = false;
  visibleUpdate:boolean = false;
  visibleDelete:boolean = false;
    constructor(){}
    skills: Skills[] = [
      {
        skillCode: 'CP001',
        skillName: 'Leadership',
      },
      {
        skillCode: 'CP002',
        skillName: 'Public Speaking',
      },
      {
        skillCode: 'CP003',
        skillName: 'Communication',
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