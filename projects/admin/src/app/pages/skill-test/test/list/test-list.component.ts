import { Component, OnInit } from '@angular/core';

interface Benefits {
  benefitCode: string;
  benefitName: string;
}

@Component({
    selector : 'benefit-list',
    templateUrl : './benefit-list.component.html'
})
export class BenefitListComponent implements OnInit{
  visibleAdd:boolean = false;
  visibleUpdate:boolean = false;
  visibleDelete:boolean = false;
    constructor(){}
    benefits: Benefits[] = [
      {
        benefitCode: 'CP001',
        benefitName: 'Jakarta',
      },
      {
        benefitCode: 'CP002',
        benefitName: 'Surabaya',
      },
      {
        benefitCode: 'CP003',
        benefitName: 'Bandung',
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