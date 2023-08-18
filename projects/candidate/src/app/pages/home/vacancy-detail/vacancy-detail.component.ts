import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'vacancy-detail',
  templateUrl: './vacancy-detail.component.html'
})
export class VacancyDetailComponent implements OnInit {
  visibleAssignJob:boolean=false;
  idJob!:string;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) {

  }
  
  init() {
    this.activatedRoute.params.subscribe(id => {
      this.idJob = String(Object.values(id));
    })
  }

  ngOnInit(){
    this.init();
  }

  // getJob() {
  //   this.jobService.getAll().subscribe(result => {
  //     this.jobs = result
  //   })
  // }

  assignJob(id:number){
    this.visibleAssignJob=true;
  }

}