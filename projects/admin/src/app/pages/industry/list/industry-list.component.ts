import { Component, OnInit } from '@angular/core';
import { IndustryGetResDto } from '@dto/industry/industry.get.res.dto';
import { IndustryService } from '../../../services/industry.service';
import { Title } from '@angular/platform-browser';

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
    constructor(
      private industryService : IndustryService,
      private title: Title
    ){
      this.title.setTitle('Industry | Job Portal Admin')
    }
    industries!: IndustryGetResDto[]

    ngOnInit(): void {
      this.getAllIndustry();
      console.log(this.industries)
    }

    getAllIndustry(){
      this.industryService.getAll().subscribe(result => {
        this.industries = result
      })
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