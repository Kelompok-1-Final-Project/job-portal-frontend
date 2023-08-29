import {
  Component,
  OnInit
} from '@angular/core';
import { FormArray, FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CityGetResDto } from '@dto/city/city.get.res.dto';
import { EmploymentTypeGetResDto } from '@dto/job/employment-type.get.res.dto';
import { JobPositionGetResDto } from '@dto/job/job-position.get.res.dto';
import { JobGetResDto } from '@dto/job/job.get.res.dto';
import { AuthService } from '@serviceCandidate/auth.service';
import { CityService } from '@serviceCandidate/city.service';
import { JobService } from '@serviceCandidate/job.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'vacancy-index',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css',]
})
export class VacancyComponent implements OnInit {
  
  userId:string='';
  industryId:string='';
  firstData:number=0;
  dataPerRow:number=10;
  lengthData!:number;

  jobs!: JobGetResDto[];
  types! : EmploymentTypeGetResDto[];
  locations!:CityGetResDto[];
  positions!:JobPositionGetResDto[];
  filteredLocation!:CityGetResDto[];

  employmentTypeSelected : string[] =[];

  searchJobReqDto = this.fb.group({
    jobName :[''],
    location :[''],
    position :[''],
    employmentType :this.fb.array(this.employmentTypeSelected),
    salaryStart :[0],
    salaryEnd :[0],
    userId : ['']
  })

  saveJobReqDto = {
    candidateId:'',
    jobId:''
  }

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

  ngOnInit(){
    this.init();
    this.userId = this.authService.getUserId();
    if(this.industryId!=''){
      this.getAllJobsIndustry();
      this.getAllJobIndustryWithPagination();
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
      this.getAllJobWithPagination();
    }
    this.getAllTypes();
    this.getAllLocations();
    this.getAllPosition();
  }


  init(){
    firstValueFrom(this.activatedRoute.params).then(id => {
      this.industryId = String(Object.values(id));
    })
  }

  getPagination(start:number,end:number){
    const data = this.searchJobReqDto.getRawValue();
    this.firstData = start;
    data.userId=this.userId;
    this.jobService.getAllWithPagination(start,end,data).subscribe(result => {
      this.jobs = result;
    })
  }

  getAllJobs() {
    const data = this.searchJobReqDto.getRawValue();
    data.userId=this.userId;
    this.lengthData=0;
    this.jobService.getAll(data).subscribe(result => {
      this.jobs = result;
      this.lengthData=result.length;
    })
  }

  getAllJobWithPagination(){
    const data = this.searchJobReqDto.getRawValue();
    data.userId=this.userId;
    this.jobService.getAllWithPagination(this.firstData,this.dataPerRow,data).subscribe(result => {
      this.jobs = result;
    })
  }

  getAllJobIndustryWithPagination(){
    const data = this.searchJobReqDto.getRawValue();
    data.userId=this.userId;
    this.jobService.getAllByIndustryWithPagination(this.firstData,this.dataPerRow,this.industryId).subscribe(result => {
      this.jobs = result;
    })
  }

  getAllJobsIndustry() {
    this.jobService.getAllByIndustry(this.industryId).subscribe(result => {
      this.jobs = result;
      this.lengthData=result.length;
    })
  }

  getAllJobsByEmploymentType(){
    const data = this.searchJobReqDto.getRawValue();
    this.jobService.getAll(data).subscribe(result => {
      this.lengthData=result.length;
     this.getAllJobWithPagination();
    })
  }

  getAllJobsBySalary(){
    const data = this.searchJobReqDto.getRawValue();
    this.jobService.getAll(data).subscribe(result => {
      this.lengthData=result.length;
     this.getAllJobWithPagination();
    })
  }

  getAllTypes() {
    firstValueFrom(this.jobService.getAllEmploymentType()).then(result => {
      this.types = result
    })
  }

  getAllLocations(){
    firstValueFrom(this.cityService.getAll()).then(result => {
      this.locations = result;
    })
  }

  onLocationClear() {
    this.searchJobReqDto.get('location')?.setValue('');
  }

  getAllPosition(){
    firstValueFrom(this.jobService.getAllPosition()).then(result => {
      this.positions = result;
    })
  }

  renderPage(event: any) {
    this.getPagination(event.first, this.dataPerRow);
  }

  onPositionClear() {
    this.searchJobReqDto.get('position')?.setValue('');
  }

  changeSaveJob(jobId:string,isBookMark:boolean,saveJobId:string,event:any){
    const data = this.saveJobReqDto;
    this.saveJobReqDto.candidateId = this.userId;
    this.saveJobReqDto.jobId = jobId;
    event.stopPropagation();
    if(isBookMark){
      this.jobService.deleteSaveJob(saveJobId).subscribe(result => {
        this.getAllJobWithPagination();
      })
    }else{
      this.jobService.insertSaveJob(data).subscribe(result => {
        this.getAllJobWithPagination();
      })
    }
  }

  get employmentType(){
    return this.searchJobReqDto.get('employmentType') as FormArray
  }

 employmentTypeChange(event: any, idString: string) {
   const data = this.employmentType.getRawValue();
   let isFound: boolean = false;

   if (event.checked.length) {
     for (let i = 0; i < data.length; i++) {
       if (data[i] == idString) {
         isFound = true;
       }
     }
     if (!isFound) {
       this.employmentType.push(this.fb.control(idString))
       this.getAllJobsByEmploymentType();
       
     }
   } else {
     let indexFound = -1
     for (let i = 0; i < data.length; i++) {
       if (data[i] == idString) {
         isFound = true;
         indexFound = i
       }
     }
     if (isFound) {
       this.employmentType.removeAt(indexFound);
       this.getAllJobsByEmploymentType();
     }
   }
 }
}