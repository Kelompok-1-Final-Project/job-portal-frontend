import {
  Component,
  OnInit
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IndustryGetResDto } from '@dto/industry/industry.get.res.dto';
import { EmploymentTypeGetResDto } from '@dto/job/employment-type.get.res.dto';
import { JobGetResDto } from '@dto/job/job.get.res.dto';
import { IndustryService } from '@serviceCandidate/industry.service';
import { JobService } from '@serviceCandidate/job.service';


@Component({
  selector: 'company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  constructor(
    private jobService: JobService,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  selectedCategories: any[] = [];

  categories: any[] = [
      { name: 'Internship', key: 'ET001' },
      { name: 'Contract', key: 'ET002' },
      { name: 'Full Time', key: 'ET003' },
      { name: 'Part Time', key: 'ET004' }
  ];

  jobs!: JobGetResDto[]
  types! : EmploymentTypeGetResDto[]

  getAllJobs() {
    this.jobService.getAll().subscribe(result => {
      this.jobs = result
    })
  }

  getAllTypes() {
    this.jobService.getAllEmploymentType().subscribe(result => {
      this.types = result
    })
  }

  ngOnInit(){
    this.getAllJobs();
    this.getAllTypes();
  }

}