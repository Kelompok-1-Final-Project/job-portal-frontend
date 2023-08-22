import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyGetResDto } from '@dto/company/company.get.res.dto';
import { JobGetResDto } from '@dto/job/job.get.res.dto';
import { CompanyService } from '@serviceCandidate/company.service';
import { JobService } from '@serviceCandidate/job.service';


@Component({
  selector: 'vacancy-detail',
  templateUrl: './vacancy-detail.component.html'
})
export class VacancyDetailComponent implements OnInit {
  visibleAssignJob:boolean=false;
  idJob!:string;
  idCompany!:string;
  job!:JobGetResDto;
  company!:CompanyGetResDto;

  constructor(
    private activatedRoute : ActivatedRoute,
    private jobService : JobService,
    private companyService : CompanyService,
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
    this.getJob();
  }

  getJob() {
    this.jobService.getById(this.idJob).subscribe(result => {
      this.job = result;
      this.companyService.getById(result.companyId).subscribe(result => {
        this.company = result;
        console.log(this.company);
      })
    })
  }

  assignJob(id:string){
    this.visibleAssignJob=true;
  }

}