import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BenefitGetResDto } from '@dto/benefit/benefit.get.res.dto';
import { AssignJobReqDto } from '@dto/candidateprogress/candidate-assign.get.res.dto';
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
  userEmail!:string;
  idJob!:string;
  codeJob!:string;
  param!:string;
  idCompany!:string;
  job!:JobGetResDto;
  company!:CompanyGetResDto;
  benefits!:BenefitGetResDto[];

  assignJobReqDto= {
    candidateEmail:'',
    jobId:'',
  };

  saveJobReqDto = {
    candidateId:'',
    jobId:''
  }

  constructor(
    private activatedRoute : ActivatedRoute,
    private authService : AuthService,
    private jobService : JobService,
    private companyService : CompanyService,
    private router : Router
  ) {

  }
  
  init() {
    this.activatedRoute.params.subscribe(param => {
      this.param = String(Object.values(param));
      if(this.param.length==5){
        this.codeJob = this.param;
        this.getJobByCode();
      }else if(this.param.length==36){
        this.idJob = this.param;
        this.getJobById();
      }
    })
  }

  ngOnInit(){
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.init();
    this.getJobBenefit();
  }

  getJobById() {
    this.jobService.getById(this.idJob,this.userId).subscribe(result => {
      this.job = result;
      this.idJob = result.id;
      this.companyService.getById(result.companyId).subscribe(result => {
        this.company = result;
      })
    })
  }

  getJobByCode() {
    this.jobService.getByCode(this.codeJob,this.userId).subscribe(result => {
      this.job = result;
      this.idJob = result.id;
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
    this.idJob = id;
    this.visibleAssignJob=true;
  }

  changeSaveJob(jobId:string,isBookMark:boolean,saveJobId:string){
    const data = this.saveJobReqDto;
    this.saveJobReqDto.candidateId = this.userId;
    this.saveJobReqDto.jobId = jobId;
    if(isBookMark){
      this.jobService.deleteSaveJob(saveJobId).subscribe(result => {
        this.getJobById();
      })
    }else{
      this.jobService.insertSaveJob(data).subscribe(result => {
        this.getJobById();
      })
    }
  }

  submitAssignJob(){
    const data = this.assignJobReqDto;
    data.candidateEmail = this.userEmail;
    data.jobId = this.idJob;
    this.jobService.assignJobCandidate(data).subscribe(result => {
      this.getJobById();
      this.visibleAssignJob=false;
    })
  }

}