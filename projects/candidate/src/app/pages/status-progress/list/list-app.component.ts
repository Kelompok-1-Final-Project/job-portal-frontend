import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { StageProgressGetResDto } from '@dto/progress/status-progress-user.get.res.dto';
import { StatusProgressService } from '@serviceCandidate/statusprogress.service';


@Component({
  selector: 'list-app-index',
  templateUrl: './list-app.component.html'
})
export class ApplicationComponent implements OnInit {
  
  userEmail:string='torang@gmail.com';
  applications!:StageProgressGetResDto[];
  assesments!:StageProgressGetResDto[];
  interview!:StageProgressGetResDto[];
  hired!:StageProgressGetResDto[];
  offering!:StageProgressGetResDto[];

  constructor(
    private statusService : StatusProgressService,
    private title : Title,
  ) {
    this.title.setTitle('Status Progress');
  }

  options = [{
      name: 'Newest',
      code: 'new'
    },
    {
      name: 'Oldest',
      code: 'old'
    }
  ];


  ngOnInit(): void {
    this.getAllApplication();
    this.getAllAssesment();
    this.getAllHired();
    this.getAllInterview();
    this.getAllOffering();
  }

  getAllApplication() {
    this.statusService.getApplication(this.userEmail).subscribe(result => {
      this.applications = result
    })
  }

  getAllAssesment() {
    this.statusService.getAssessment(this.userEmail).subscribe(result => {
      this.assesments = result
    })
  }

  getAllInterview() {
    this.statusService.getInterview(this.userEmail).subscribe(result => {
      this.interview = result
    })
  }

  getAllHired() {
    this.statusService.getHired(this.userEmail).subscribe(result => {
      this.interview = result
    })
  }
  getAllOffering() {
    this.statusService.getOffering(this.userEmail).subscribe(result => {
      this.interview = result
    })
  }
}