import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { JobStatus } from "@constant/job-status.constant";
import { JobAdminGetResDto } from "@dto/job/job-admin.get.res.dto";
import { AuthService } from "@serviceAdmin/auth.service";
import { JobService } from "@serviceAdmin/job.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  visibleAssign: boolean = false;
  vacancies!: JobAdminGetResDto[]
  userId!: string
  searchText: string = ''

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

  ngAfterViewInit(): void {

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

  statusColor(name: string): any {
    if (name === JobStatus.OPEN) {
      return "success"
    } else if (name === JobStatus.CLOSED) {
      return "danger"
    } else if (name === JobStatus.DRAFT) {
      return "warning"
    }
  }

}