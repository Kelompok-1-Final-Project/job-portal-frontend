import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { JobGetResDto } from '@dto/job/job.get.res.dto';
import { SaveJobGetResDto } from '@dto/savejob/save-job.get.res.dto';
import { AuthService } from '@serviceCandidate/auth.service';
import { JobService } from '@serviceCandidate/job.service';


@Component({
  selector: 'save-jobs',
  templateUrl: './save-jobs.component.html'
})
export class SaveJobsComponent implements OnInit {

  userId!:string;
  constructor(
    private jobService: JobService,
    private authService : AuthService,
    private title: Title,
  ) {}

  jobs!: SaveJobGetResDto[];


  ngOnInit(){
    this.userId  = this.authService.getUserId();
    this.getAllJobs();
  }

  deleteSaveJob(saveJobId:string,event:any){
    event.stopPropagation();
      this.jobService.deleteSaveJob(saveJobId).subscribe(result => {
        this.getAllJobs();
      })
  }

  getAllJobs() {
    this.jobService.getAllSaveJobs(this.userId).subscribe(result => {
      this.jobs = result
    })
  }

}