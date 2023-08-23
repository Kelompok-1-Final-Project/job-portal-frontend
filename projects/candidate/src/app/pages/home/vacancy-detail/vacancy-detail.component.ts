import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BenefitGetResDto } from '@dto/benefit/benefit.get.res.dto';
import { CompanyGetResDto } from '@dto/company/company.get.res.dto';
import { JobGetResDto } from '@dto/job/job.get.res.dto';
import { AuthService } from '@serviceCandidate/auth.service';
import { CompanyService } from '@serviceCandidate/company.service';
import { JobService } from '@serviceCandidate/job.service';


@Component({
  selector: 'vacancy-detail',
  templateUrl: './vacancy-detail.component.html'
})
export class VacancyDetailComponent implements OnInit {
  visibleAssignJob:boolean=false;
  userId!:string;
  idJob!:string;
  idCompany!:string;
  job!:JobGetResDto;
  company!:CompanyGetResDto;
  benefits!:BenefitGetResDto[];

  constructor(
    private activatedRoute : ActivatedRoute,
    private authService : AuthService,
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
    this.userId = this.authService.getUserId();
    this.init();
    this.getJob();
    this.getJobBenefit();
  }

  getJob() {
    this.jobService.getById(this.idJob,this.userId).subscribe(result => {
      this.job = result;
      this.companyService.getById(result.companyId).subscribe(result => {
        this.company = result;
      })
    })
  }

  getJobBenefit(){
    this.jobService.getAllBenefitJob(this.idJob).subscribe(result => {
      this.benefits = result;
    })
  }

  assignJob(id:string){
    this.visibleAssignJob=true;
  }

}