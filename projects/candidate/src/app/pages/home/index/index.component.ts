import {
  Component,
  OnInit
} from '@angular/core';
import {
  NonNullableFormBuilder
} from '@angular/forms';
import {
  Title
} from '@angular/platform-browser';
import {
  Router
} from '@angular/router';
import { CityGetResDto } from '@dto/city/city.get.res.dto';
import {
  IndustryGetResDto
} from '@dto/industry/industry.get.res.dto';
import { JobPositionGetResDto } from '@dto/job/job-position.get.res.dto';
import { CityService } from '@serviceCandidate/city.service';
import {
  IndustryService
} from '@serviceCandidate/industry.service';
import { JobService } from '@serviceCandidate/job.service';


@Component({
  selector: 'home-index',
  templateUrl: './index.component.html',
  styleUrls:['./index.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private industryService: IndustryService,
    private jobService : JobService,
    private cityService : CityService,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {
    this.title.setTitle('Industry | InLook')
  }

  industries!: IndustryGetResDto[]
  locations!:CityGetResDto[];
  positions!:JobPositionGetResDto[];

  employmentTypeSelected: string[] = [];

  searchJobReqDto = this.fb.group({
    jobName :[''],
    location :[''],
    position :[''],
    employmentType :this.fb.array(this.employmentTypeSelected),
    salaryStart :[0],
    salaryEnd :[0],
    userId : ['']
  })

  carouselImages = [
    'carousel-1.jpg',
    'carousel-2.jpg',
    'carousel-3.jpg',
  ];

  ngOnInit(): void {
    this.getAllIndustry();
    this.getAllLocations();
    this.getAllPosition();
  }

  getAllIndustry() {
    this.industryService.getAll().subscribe(result => {
      this.industries = result
    })
  }

  searchJobs(){
    this.jobService.searchJobs=this.searchJobReqDto.getRawValue();
    this.router.navigateByUrl('home/job')  
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

  onLocationClear(){
    this.searchJobReqDto.get('location')?.setValue('');
  }
  onPositionClear(){
    this.searchJobReqDto.get('position')?.setValue('');
  }

}