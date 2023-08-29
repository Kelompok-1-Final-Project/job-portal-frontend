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
  


  init(){
    firstValueFrom(this.activatedRoute.params).then(id => {
      this.industryId = String(Object.values(id));
    })
  }

  getAllJobs() {
    const data = this.searchJobReqDto.getRawValue();
    data.userId=this.userId;
    firstValueFrom(this.jobService.getAll(data)).then(result => {
      this.jobs = result
    })
  }

  getAllJobsIndustry() {
    firstValueFrom(this.jobService.getAllByIndustry(this.industryId)).then(result => {
      this.jobs = result
    })
  }

  getAllJobsByEmploymentType(){
    const data = this.searchJobReqDto.getRawValue();
    firstValueFrom(this.jobService.getAll(data)).then(result => {
      this.jobs = result
    })
  }

  getAllJobsBySalary(){
    const data = this.searchJobReqDto.getRawValue();
    console.log(data);
    firstValueFrom(this.jobService.getAll(data)).then(result => {
      this.jobs = result
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

  onPositionClear() {
    this.searchJobReqDto.get('position')?.setValue('');
  }

  changeSaveJob(jobId:string,isBookMark:boolean,saveJobId:string,event:any){
    const data = this.saveJobReqDto;
    this.saveJobReqDto.candidateId = this.userId;
    this.saveJobReqDto.jobId = jobId;
    event.stopPropagation();
    if(isBookMark){
      firstValueFrom(this.jobService.deleteSaveJob(saveJobId)).then(result => {
        this.getAllJobs();
      })
    }else{
      firstValueFrom(this.jobService.insertSaveJob(data)).then(result => {
        this.getAllJobs();
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