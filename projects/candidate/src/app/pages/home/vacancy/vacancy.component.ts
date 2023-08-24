import {
  Component,
  OnInit
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CityGetResDto } from '@dto/city/city.get.res.dto';
import { EmploymentTypeGetResDto } from '@dto/job/employment-type.get.res.dto';
import { JobPositionGetResDto } from '@dto/job/job-position.get.res.dto';
import { JobGetResDto } from '@dto/job/job.get.res.dto';
import { AuthService } from '@serviceCandidate/auth.service';
import { CityService } from '@serviceCandidate/city.service';
import { JobService } from '@serviceCandidate/job.service';


@Component({
  selector: 'vacancy-index',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css',]
})
export class VacancyComponent implements OnInit {
  
  userId:string='';
  industryId:string='';
  jobs!: JobGetResDto[];
  types! : EmploymentTypeGetResDto[];
  locations!:CityGetResDto[];
  positions!:JobPositionGetResDto[];
  filteredLocation!:CityGetResDto[];

  constructor(
    private jobService: JobService,
    private cityService : CityService,
    private authService : AuthService,
    private activatedRoute : ActivatedRoute,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {
    
  }
  
  searchJobReqDto = this.fb.group({
    jobName :[''],
    location :[''],
    position :[''],
    employmentType :[''],
    salaryStart :[0],
    salaryEnd :[0],
    userId : ['']
  })

  saveJobReqDto = {
    candidateId:'',
    jobId:''
  }

  init(){
    this.activatedRoute.params.subscribe(id => {
      this.industryId = String(Object.values(id));
    })
  }

  getAllJobs() {
    const data = this.searchJobReqDto.getRawValue();
    data.userId=this.userId;
    this.jobService.getAll(data).subscribe(result => {
      this.jobs = result
    })
  }

  getAllJobsIndustry() {
    this.jobService.getAllByIndustry(this.industryId).subscribe(result => {
      this.jobs = result
    })
  }

  getAllJobsByEmploymentType(emType:string){
    const data = this.searchJobReqDto.getRawValue();
    data.employmentType = emType;
    this.jobService.getAll(data).subscribe(result => {
      this.jobs = result
    })
  }

  getAllJobsBySalary(){
    const data = this.searchJobReqDto.getRawValue();
    console.log(data);
    this.jobService.getAll(data).subscribe(result => {
      this.jobs = result
    })
  }

  getAllTypes() {
    this.jobService.getAllEmploymentType().subscribe(result => {
      this.types = result
    })
  }

  getAllLocations(){
    this.cityService.getAll().subscribe(result => {
      this.locations = result;
    })
  }

  getAllPosition(){
    this.jobService.getAllPosition().subscribe(result => {
      this.positions = result;
    })
  }

  changeSaveJob(jobId:string,isBookMark:boolean,saveJobId:string,event:any){
    const data = this.saveJobReqDto;
    this.saveJobReqDto.candidateId = this.userId;
    this.saveJobReqDto.jobId = jobId;
    event.stopPropagation();
    if(isBookMark){
      this.jobService.deleteSaveJob(saveJobId).subscribe(result => {
        this.getAllJobs();
      })
    }else{
      this.jobService.insertSaveJob(data).subscribe(result => {
        this.getAllJobs();
      })
    }
  }

  ngOnInit(){
    this.init();
    this.userId = this.authService.getUserId();
    if(this.industryId!=''){
      this.getAllJobsIndustry();
      this.industryId='';
    }else{
      if(this.jobService.searchJobs!=null){
        this.searchJobReqDto.patchValue({
          jobName : this.jobService.searchJobs.jobName,
          location : this.jobService.searchJobs.location,
          position : this.jobService.searchJobs.position
        })
      }
      this.getAllJobs();
    }
    this.getAllTypes();
    this.getAllLocations();
    this.getAllPosition();
  }

}