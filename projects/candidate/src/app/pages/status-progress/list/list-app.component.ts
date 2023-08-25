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
  lengthApplicantions:number=0;
  lengthAssesments:number=0;
  lengthInterview:number=0;
  lengthMcu:number=0;
  lengthHireds:number=0;
  lengthOffering:number=0;
  lengthReject:number=0;

  applications!: StageProgressGetResDto[];
  assesments!: StageProgressGetResDto[];
  interview!: StageProgressGetResDto[];
  listMcu!: StageProgressGetResDto[];
  hired!: StageProgressGetResDto[];
  offering!: StageProgressGetResDto[];
  reject!:StageProgressGetResDto[];

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
    this.getAllMcu();
    this.getAllOffering();
  }

  getAllApplication() {
    const data = this.userReqDto;
    this.statusService.getApplication(data).subscribe(result => {
      this.applications = result
      this.lengthApplicantions=result.length;
    })
  }

  getAllAssesment() {
    const data = this.userReqDto;
    this.statusService.getAssessment(data).subscribe(result => {
      this.assesments = result
      this.lengthAssesments=result.length;
    })
  }

  getAllInterview() {
    const data = this.userReqDto;
    this.statusService.getInterview(data).subscribe(result => {
      this.interview = result
      this.lengthMcu=result.length;
    })
  }

  getAllHired() {
    const data = this.userReqDto;
    this.statusService.getHired(data).subscribe(result => {
      this.hired = result
      this.lengthHireds=result.length;
    })
  }
  getAllOffering() {
    const data = this.userReqDto;
    this.statusService.getOffering(data).subscribe(result => {
      this.offering = result
      this.lengthOffering = result.length
    })
  }

  getAllMcu() {
    const data = this.userReqDto;
    this.statusService.getMedicalCheckup(data).subscribe(result => {
      this.listMcu = result
      this.lengthMcu=result.length;
    })
  }

  getAllReject() {
    const data = this.userReqDto;
    this.statusService.getReject(data).subscribe(result => {
      this.reject = result;
      this.lengthReject=result.length;
    })
  }
}