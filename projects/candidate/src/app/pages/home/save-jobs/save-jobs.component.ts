import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JobGetResDto } from '@dto/job/job.get.res.dto';
import { SaveJobGetResDto } from '@dto/savejob/save-job.get.res.dto';
import { AuthService } from '@serviceCandidate/auth.service';
import { JobService } from '@serviceCandidate/job.service';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'save-jobs',
  templateUrl: './save-jobs.component.html'
})
export class SaveJobsComponent implements OnInit {

  userId!:string;
  lengthSaveJobs:number=0;
  firstData:number=0;
  dataPerRow:number=9;
  visibleRedirectModal:boolean=false;

  constructor(
    private jobService: JobService,
    private authService : AuthService,
    private router :Router,
    private title: Title,
    private messageService : MessageService,
  ) {}

  jobs!: SaveJobGetResDto[];


  ngOnInit(){
    this.userId  = this.authService.getUserId();
    if(!this.userId){ 
      this.showWarnToLogin();
      this.router.navigateByUrl('/home');
    }
    this.getAllJobs();
    this.getAllJobsWithPagination();
  }

  deleteSaveJob(saveJobId:string,event:any){
    event.stopPropagation();
      firstValueFrom(this.jobService.deleteSaveJob(saveJobId)).then(result => {
        this.lengthSaveJobs=this.lengthSaveJobs-1;
        this.getAllJobsWithPagination();
      })
  }

  getAllJobs() {
    firstValueFrom(this.jobService.getAllSaveJobs(this.userId)).then(result => {
      this.jobs = result
      this.lengthSaveJobs = result.length;
    })
  }

  getAllJobsWithPagination(){
    firstValueFrom(this.jobService.getAllSaveJobsWithPagination(this.firstData,this.dataPerRow,this.userId)).then(result => {
      this.jobs = result
    })
  }

  getPagination(start:number,end:number){
    this.firstData = start;
    firstValueFrom(this.jobService.getAllSaveJobsWithPagination(start,end,this.userId)).then(result => {
      this.jobs = result;
    })
  }

  renderPage(event: any) {
    this.getPagination(event.first,this.dataPerRow);
  }

  showWarnToLogin() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'You must log in to access this page' });
}
}