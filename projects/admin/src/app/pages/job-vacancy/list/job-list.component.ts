import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { JobAdminGetResDto } from "@dto/job/job-admin.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {
  visibleAssign: boolean = false;

  vacancies!: JobAdminGetResDto[]
  constructor(
    private title: Title,
    private jobService: JobService
  ) {
    this.title.setTitle('Job Vacancies | Admin Job Portal')
  }

  ngOnInit(): void {
    this.getJob()
  }

  getJob() {
    this.jobService.getAll().subscribe(result => {
      this.vacancies = result
    })
  }
  
}