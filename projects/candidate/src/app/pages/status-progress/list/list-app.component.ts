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
  UserEmailResDto
} from '@dto/user/user-email-res.dto';
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
  userEmailDto!: UserEmailResDto;
  applications!: StageProgressGetResDto[];
  assesments!: StageProgressGetResDto[];
  interview!: StageProgressGetResDto[];
  hired!: StageProgressGetResDto[];
  offering!: StageProgressGetResDto[];

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

    this.getUserEmail();
  }

  getUserEmail() {
    this.profileService.getEmailUser(this.userId).subscribe(result => {
      this.userEmailDto = result
      this.userEmail = result.email
      this.getAllApplication();
      this.getAllAssesment();
      this.getAllHired();
      this.getAllInterview();
      this.getAllOffering();
    })
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