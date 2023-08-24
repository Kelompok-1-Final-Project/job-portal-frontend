import {
  Component,
  OnInit
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { InterviewGetResDto } from '@dto/interview/interview.get.res.dto';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'interview-list',
  templateUrl: './interview-list.component.html'
})
export class InterviewListComponent implements OnInit {

  visibleUpdateNotes:boolean=false;

  interviewUpdateReqDto = this.fb.group({
    interviewId: ['', [Validators.required]],
    notes: ['', [Validators.required]]
  })

  constructor(
    private statusProgressService : StatusProgressService,
    private title: Title,
    private fb: NonNullableFormBuilder
  ) {
    this.title.setTitle('Interview | Job Portal Admin')
  }
  interviews!: InterviewGetResDto[]

  ngOnInit(): void {
    this.getInterview()
  }

  getInterview(){
    firstValueFrom(this.statusProgressService.getInterview()).then(result => {
      this.interviews = result
    })
  }

  insertNotes(id: string){
    this.visibleUpdateNotes = true
    this.interviewUpdateReqDto.get('interviewId')?.setValue(id)
  }

  updateNotes(){
    const data = this.interviewUpdateReqDto.getRawValue()
    firstValueFrom(this.statusProgressService.updateNotes(data)).then(result =>{
      this.visibleUpdateNotes = false
    })
  }
}