import { Component, OnInit } from '@angular/core';

interface Industries {
  industryCode: string;
  industryName: string;
}

@Component({
    selector : 'industry-list',
    templateUrl : './industry-list.component.html'
})
export class IndustryListComponent implements OnInit{
  visibleAdd:boolean = false;
  visibleUpdate:boolean = false;
  visibleDelete:boolean = false;
    constructor(){}
    industries: Industries[] = [
      {
        industryCode: 'CP001',
        industryName: 'Jakarta',
      },
      {
        industryCode: 'CP002',
        industryName: 'Surabaya',
      },
      {
        industryCode: 'CP003',
        industryName: 'Bandung',
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