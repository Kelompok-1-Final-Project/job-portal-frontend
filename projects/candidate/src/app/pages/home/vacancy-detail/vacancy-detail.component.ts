import {
  Component,
  OnInit
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BenefitGetResDto } from '@dto/benefit/benefit.get.res.dto';
import { AssignJobReqDto } from '@dto/candidateprogress/candidate-assign.get.res.dto';
import { CompanyGetResDto } from '@dto/company/company.get.res.dto';
import { JobGetResDto } from '@dto/job/job.get.res.dto';
import { AuthService } from '@serviceCandidate/auth.service';
import { CompanyService } from '@serviceCandidate/company.service';
import { JobService } from '@serviceCandidate/job.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css',]
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
  jobDesc!:SafeHtml;

  assignJobReqDto= {
    candidateEmail:'',
    jobId:'',
  };

  saveJobReqDto = {
    candidateId:'',
    jobId:''
  }

  updatedAt!:String;

  constructor(
    private activatedRoute : ActivatedRoute,
    private authService : AuthService,
    private jobService : JobService,
    private companyService : CompanyService,
    private router:Router,
    private sn : DomSanitizer
  ) {

  }
  
  init() {
    firstValueFrom(this.activatedRoute.params).then(param => {
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
    if(!this.userId){
      this.router.navigateByUrl('/login');
    }
    this.userEmail = this.authService.getUserEmail();
    this.init();
    this.getJobBenefit();
  }

  getJobById() {
    firstValueFrom(this.jobService.getById(this.idJob,this.userId)).then(result => {
      this.job = result;
      this.idJob = result.id;
      console.log(result)
      if(result.updatedAt != null){
        this.updatedAt = result.updatedAt
      }
      else{
        this.updatedAt = result.createdAt
      }
      firstValueFrom(this.companyService.getById(result.companyId)).then(result => {
        this.company = result;
        this.showJobDescription();
      })
    })
  }

  showJobDescription(){
    this.jobDesc = this.sn.bypassSecurityTrustHtml(this.job.description);
  }

  getJobByCode() {
    firstValueFrom(this.jobService.getByCode(this.codeJob,this.userId)).then(result => {
      this.job = result;
      this.idJob = result.id;
      if(result.updatedAt != null){
        this.updatedAt = result.updatedAt
      }
      else{
        this.updatedAt = result.createdAt
      }
      firstValueFrom(this.companyService.getById(result.companyId)).then(result => {
        this.company = result;
      })
    })
  }

  getJobBenefit(){
    firstValueFrom(this.jobService.getAllBenefitJob(this.idJob)).then(result => {
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
      firstValueFrom(this.jobService.deleteSaveJob(saveJobId)).then(result => {
        this.getJobById();
      })
    }else{
      firstValueFrom(this.jobService.insertSaveJob(data)).then(result => {
        this.getJobById();
      })
    }
  }

  submitAssignJob(){
    const data = this.assignJobReqDto;
    data.candidateEmail = this.userEmail;
    data.jobId = this.idJob;
    firstValueFrom(this.jobService.assignJobCandidate(data)).then(result => {
      this.getJobById();
      this.visibleAssignJob=false;
    })
  }

}