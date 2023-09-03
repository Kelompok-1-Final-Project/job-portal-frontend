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
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'list-app-index',
  templateUrl: './list-app.component.html'
})
export class ApplicationComponent implements OnInit {

  userId: string = '';
  userEmail: string = '';
  firstData:number=0;
  dataPerRow:number=10;
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
    email : '',
    startIndex :0,
    endIndex :0,
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
    this.getAllApplicationWithPagination(this.firstData,this.dataPerRow);
    this.getAllAssesment();
    this.getAllAssesmentWithPagination(this.firstData,this.dataPerRow)
    this.getAllHired();
    this.getAllHiredWithPagination(this.firstData,this.dataPerRow);
    this.getAllInterview();
    this.getAllInterviewWithPagination(this.firstData,this.dataPerRow);
    this.getAllMcu();
    this.getAllMcuWithPagination(this.firstData,this.dataPerRow);
    this.getAllOffering();
    this.getAllOfferingWithPagination(this.firstData,this.dataPerRow);
  }

  getAllApplication() {
    const data = this.userReqDto;
    this.statusService.getApplication(data).subscribe(result => {
      this.applications=result;
      this.lengthApplicantions=result.length;
    })
  }

  getAllApplicationWithPagination(startIndex:number,maxResult:number){
    const data = this.userReqDto;
    data.startIndex = startIndex;
    data.endIndex = maxResult;
    this.statusService.getApplicationWithPagination(data).subscribe(result => {
      this.applications=result;
      console.log(this.applications);
    })
  }

  renderPageApplication(event: any) {
    this.getAllApplicationWithPagination(event.first, this.dataPerRow);
  }

  getAllAssesmentWithPagination(startIndex:number,maxResult:number){
    const data = this.userReqDto;
    data.startIndex = startIndex;
    data.endIndex = maxResult;
    this.statusService.getAssesmentWithPagination(data).subscribe(result => {
      this.assesments=result;
    })
  }

  renderPageAssesment(event: any) {
    this.getAllAssesmentWithPagination(event.first,this.dataPerRow);
  }
  
  getAllAssesment() {
    const data = this.userReqDto;
    firstValueFrom(this.statusService.getAssessment(data)).then(result => {
      this.assesments = result
      this.lengthAssesments=result.length;
    })
  }

  getAllInterview() {
    const data = this.userReqDto;
    firstValueFrom(this.statusService.getInterview(data)).then(result => {
      this.interview = result
      this.lengthInterview=result.length;
    })
  }

  getAllInterviewWithPagination(startIndex:number,maxResult:number){
    const data = this.userReqDto;
    data.startIndex = startIndex;
    data.endIndex = maxResult;
    this.statusService.getInterviewWithPagination(data).subscribe(result => {
      this.interview=result;
    })
  }

  renderPageInterview(event: any) {
    this.getAllInterviewWithPagination(event.first,this.dataPerRow);
  }

  getAllHired() {
    const data = this.userReqDto;
    firstValueFrom(this.statusService.getHired(data)).then(result => {
      this.hired = result
      this.lengthHireds=result.length;
    })
  }

  getAllHiredWithPagination(startIndex:number,maxResult:number){
    const data = this.userReqDto;
    data.startIndex = startIndex;
    data.endIndex = maxResult;
    this.statusService.getHiredWithPagination(data).subscribe(result => {
      this.hired=result;
    })
  }

  renderPageHired(event: any) {
    this.getAllHiredWithPagination(event.first,this.dataPerRow);
  }

  getAllOffering() {
    const data = this.userReqDto;
    firstValueFrom(this.statusService.getOffering(data)).then(result => {
      this.offering = result
      this.lengthOffering = result.length
    })
  }

  getAllOfferingWithPagination(startIndex:number,maxResult:number){
    const data = this.userReqDto;
    data.startIndex = startIndex;
    data.endIndex = maxResult;
    this.statusService.getOfferingWithPagination(data).subscribe(result => {
      this.offering=result;
    })
  }

  renderPageOffering(event: any) {
    this.getAllHiredWithPagination(event.first,this.dataPerRow);
  }

  getAllMcu() {
    const data = this.userReqDto;
    firstValueFrom(this.statusService.getMedicalCheckup(data)).then(result => {
      this.listMcu = result
      this.lengthMcu=result.length;
    })
  }

  getAllMcuWithPagination(startIndex:number,maxResult:number){
    const data = this.userReqDto;
    data.startIndex = startIndex;
    data.endIndex = maxResult;
    this.statusService.getMedicalCheckupWithPagination(data).subscribe(result => {
      this.listMcu=result;
    })
  }

  renderPageMcu(event: any) {
    this.getAllMcuWithPagination(event.first,this.dataPerRow);
  }

  getAllReject() {
    const data = this.userReqDto;
    firstValueFrom(this.statusService.getReject(data)).then(result => {
      this.reject = result;
      this.lengthReject=result.length;
    })
  }

  getAllRejectWithPagination(startIndex:number,maxResult:number){
    const data = this.userReqDto;
    data.startIndex = startIndex;
    data.endIndex = maxResult;
    this.statusService.getRejectWithPagination(data).subscribe(result => {
      this.reject=result;
    })
  }

  renderPageReject(event: any) {
    this.getAllRejectWithPagination(event.first,this.dataPerRow);
  }
  
}