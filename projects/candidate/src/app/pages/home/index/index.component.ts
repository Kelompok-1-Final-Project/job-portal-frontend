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
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'home-index',
  templateUrl: './index.component.html',
  styleUrls:['./index.component.css']
})
export class HomeComponent implements OnInit {

  
    hoverIndex: number | null = null;
    industries!: IndustryGetResDto[]
    locations!:CityGetResDto[];
    positions!:JobPositionGetResDto[];
    
  
    employmentTypeSelected: string[] = [];

    responsiveOptions: any[] | undefined;

    
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

  searchJobReqDto = this.fb.group({
    jobName :[''],
    location :[''],
    position :[''],
    employmentType :this.fb.array(this.employmentTypeSelected),
    salaryStart :[0],
    salaryEnd :[0],
    userId : ['']
  })

  quotes = [
    {
      text: 'The only limit to our realization of tomorrow will be our doubts of today.',
      author: 'Franklin D. Roosevelt'
    },
    {
      text: 'The future belongs to those who believe in the beauty of their dreams.',
      author: 'Eleanor Roosevelt'
    },
    {
      text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
      author: 'Winston Churchill'
    },
    {
      text: 'The best way to predict the future is to create it.',
      author: 'Peter Drucker'
    }
  ];

  ngOnInit(): void {
    this.getAllIndustry();
    this.getAllLocations();
    this.getAllPosition();

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  getAllIndustry() {
    firstValueFrom(this.industryService.getAll()).then(result => {
      this.industries = result
    })
  }

  searchJobs(){
    this.jobService.searchJobs=this.searchJobReqDto.getRawValue();
    this.router.navigateByUrl('home/job')  
  }

  getAllLocations(){
    firstValueFrom(this.cityService.getAll()).then(result => {
      this.locations = result;
    })
  }

  getAllPosition(){
    firstValueFrom(this.jobService.getAllPosition()).then(result => {
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