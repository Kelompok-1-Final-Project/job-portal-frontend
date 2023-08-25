import {
  Component,
  OnInit
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';
import {
  StageProgressGetResDto
} from '@dto/progress/status-progress-user.get.res.dto';
import {
  AuthService
} from '@serviceCandidate/auth.service';
import {
  ProfileService
} from '@serviceCandidate/profile.service';
import {
  StatusProgressService
} from '@serviceCandidate/statusprogress.service';


@Component({
  selector: 'list-app-index',
  templateUrl: './list-app.component.html'
})
export class ApplicationComponent implements OnInit {

  userId: string = '';
  userEmail: string = '';
  applications!: StageProgressGetResDto[];
  assesments!: StageProgressGetResDto[];
  interview!: StageProgressGetResDto[];
  hired!: StageProgressGetResDto[];
  offering!: StageProgressGetResDto[];
  userReqDto = {
    email : ''
  }

  constructor(
    private authService: AuthService,
    private statusService: StatusProgressService,
    private profileService: ProfileService,
    private title: Title,
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
    this.userId = this.authService.getUserId();
    this.userEmail = this.authService.getUserEmail();
    this.userReqDto.email = this.userEmail; 
    this.getAllApplication();
    this.getAllAssesment();
    this.getAllHired();
    this.getAllInterview();
    this.getAllOffering();
  }

  getAllApplication() {
    const data = this.userReqDto;
    this.statusService.getApplication(data).subscribe(result => {
      this.applications = result
    })
  }

  getAllAssesment() {
    const data = this.userReqDto;
    this.statusService.getAssessment(data).subscribe(result => {
      this.assesments = result
    })
  }

  getAllInterview() {
    const data = this.userReqDto;
    this.statusService.getInterview(data).subscribe(result => {
      this.interview = result
    })
  }

  getAllHired() {
    const data = this.userReqDto;
    this.statusService.getHired(data).subscribe(result => {
      this.interview = result
    })
  }
  getAllOffering() {
    const data = this.userReqDto;
    this.statusService.getOffering(data).subscribe(result => {
      this.interview = result
    })
  }
}