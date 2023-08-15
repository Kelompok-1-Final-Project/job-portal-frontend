import { Component, OnInit } from '@angular/core';

@Component({
    selector : 'benefit-list',
    templateUrl : './benefit-list.component.html'
})
export class BenefitListComponent implements OnInit{
  visibleAdd:boolean = false;
  visibleUpdate:boolean = false;
  visibleDelete:boolean = false;
    constructor(){}
    benefits = [
      {
        benefitCode: 'BN001',
        benefitName: 'Laptop',
      },
      {
        benefitCode: 'BN002',
        benefitName: 'Transport',
      },
      {
        benefitCode: 'BN003',
        benefitName: 'Asuransi',
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