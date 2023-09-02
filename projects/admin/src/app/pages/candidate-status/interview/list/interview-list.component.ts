import {
  Component,
  OnInit
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { InterviewGetResDto } from '@dto/interview/interview.get.res.dto';
import { AuthService } from '@serviceAdmin/auth.service';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css']
})
export class InterviewListComponent implements OnInit {

  visibleUpdateNotes: boolean = false;
  userId!:string
  search: string = ''
  loading: boolean = false

  interviewUpdateReqDto = this.fb.group({
    interviewId: ['', [Validators.required]],
    notes: ['', [Validators.required]]
  })

  constructor(
    private statusProgressService: StatusProgressService,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {
    this.title.setTitle('Interview | Job Portal Admin')
  }
  interviews!: InterviewGetResDto[]

  ngOnInit(): void {
    this.getProfile()
    this.getInterview()
  }

  getInterview() {
    firstValueFrom(this.statusProgressService.getInterview(this.userId)).then(result => {
      this.interviews = result
    })
  }

  insertNotes(id: string) {
    this.visibleUpdateNotes = true
    this.interviewUpdateReqDto.get('interviewId')?.setValue(id)
  }

  getProfile(){
    const profile = this.authService.getProfile()
    if(profile){
      this.userId = profile.userId
    }
  }

  updateNotes() {
    this.loading = true
    const data = this.interviewUpdateReqDto.getRawValue()
    firstValueFrom(this.statusProgressService.updateInterviewNotes(data)).then(result => {
      this.loading = false
      this.visibleUpdateNotes = false
      this.getInterview()
    })
  }
}