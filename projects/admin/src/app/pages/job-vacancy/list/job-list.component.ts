import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { JobGetResDto } from "@dto/job/job.get.res.dto";
import { JobService } from "@serviceAdmin/job.service";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {
  visibleAssign: boolean = false;

  vacancies!: JobGetResDto[]
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

  // getPhotoUrl(base64String: string): string {
  //     return 'data:image/jpeg;base64,' + base64String;
  //   }


  // assign(id:number){
  //   this.visibleAssign=true;
  // }
}