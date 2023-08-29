import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { JobStatus } from "@constant/job-status.constant";
import { JobAdminGetResDto } from "@dto/job/job-admin.get.res.dto";
import { AuthService } from "@serviceAdmin/auth.service";
import { JobService } from "@serviceAdmin/job.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html'
})
export class JobListComponent implements OnInit {

  visibleAssign: boolean = false;
  vacancies!: JobAdminGetResDto[]
  userId!: string

  constructor(
    private title: Title,
    private jobService: JobService,
    private authService: AuthService
  ) {
    this.title.setTitle('Job Vacancies | Admin Job Portal')
  }

  ngOnInit(): void {
    this.getProfile()
    this.getJob()
  }

  getJob() {
    firstValueFrom(this.jobService.getAll(this.userId)).then(result => {
      this.vacancies = result
    })
  }

  getProfile() {
    const profile = this.authService.getProfile()
    if (profile) {
      this.userId = profile.userId
    }
  }

  statusColor(name: string): any{
    if (name === JobStatus.OPEN) {
      return "success"
    } else if (name === JobStatus.CLOSED) {
      return "danger"
    } else if (name === JobStatus.DRAFT) {
      return "warning"
    }
  }

}