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
  lengthSaveJobs:number=0;
  firstData:number=0;
  dataPerRow:number=9;

  constructor(
    private jobService: JobService,
    private authService : AuthService,
    private title: Title,
  ) {}

  jobs!: SaveJobGetResDto[];


  ngOnInit(){
    this.userId  = this.authService.getUserId();
    this.getAllJobs();
    this.getAllJobsWithPagination();
  }

  deleteSaveJob(saveJobId:string,event:any){
    event.stopPropagation();
      this.jobService.deleteSaveJob(saveJobId).subscribe(result => {
        this.lengthSaveJobs=this.lengthSaveJobs-1;
        this.getAllJobsWithPagination();
      })
  }

  getAllJobs() {
    this.jobService.getAllSaveJobs(this.userId).subscribe(result => {
      this.jobs = result
      this.lengthSaveJobs = result.length;
    })
  }

  getAllJobsWithPagination(){
    this.jobService.getAllSaveJobsWithPagination(this.firstData,this.dataPerRow,this.userId).subscribe(result => {
      this.jobs = result
    })
  }

  getPagination(start:number,end:number){
    this.firstData = start;
    this.jobService.getAllSaveJobsWithPagination(start,end,this.userId).subscribe(result => {
      this.jobs = result;
    })
  }

  renderPage(event: any) {
    this.getPagination(event.first,this.dataPerRow);
  }
}