import {
  Component,
  OnInit
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CityGetResDto } from '@dto/city/city.get.res.dto';
import { IndustryGetResDto } from '@dto/industry/industry.get.res.dto';
import { EmploymentTypeGetResDto } from '@dto/job/employment-type.get.res.dto';
import { JobGetResDto } from '@dto/job/job.get.res.dto';
import { CityService } from '@serviceCandidate/city.service';
import { IndustryService } from '@serviceCandidate/industry.service';
import { JobService } from '@serviceCandidate/job.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';


@Component({
  selector: 'vacancy-index',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css',]
})
export class VacancyComponent implements OnInit {
  
  jobs!: JobGetResDto[]
  types! : EmploymentTypeGetResDto[]
  locations!:CityGetResDto[];
  filteredLocation!:CityGetResDto[];
  listLocation:any='';

  constructor(
    private jobService: JobService,
    private cityService : CityService,
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
    salaryEnd :[0]
    
  })

  filterLocation(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.locations as any[]).length; i++) {
        let location = (this.locations as any[])[i];
        if (location.cityName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(location);
        }
    }

    this.filteredLocation = filtered;
}


  getAllJobs() {
    const data = this.searchJobReqDto.getRawValue();
    this.jobService.getAll(data).subscribe(result => {
      this.jobs = result
    })
  }

  getAllTypes() {
    this.jobService.getAllEmploymentType().subscribe(result => {
      this.types = result
    })
  }

  get locationList() {
    return this.searchJobReqDto.get('cityCode');
  }

  getLocation(event: any) {
    console.log(event);
    // for (let i = 0; i < event.length; i++) {
    //   this.searchJobReqDto.patchValue({
    //     location:this.fb.control(event[i].cityCode)
    // })
    // }
  //   this.searchJobReqDto.patchValue({
  //     location: cityCode
  // })
}

  getAllLocations(){
    this.cityService.getAll().subscribe(result => {
      this.locations = result;
    })
  }

  ngOnInit(){
    this.getAllJobs();
    this.getAllTypes();
    this.getAllLocations();
  }

}