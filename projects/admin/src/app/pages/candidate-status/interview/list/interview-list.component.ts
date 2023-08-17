import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { InterviewGetResDto } from '@dto/interview/interview.get.res.dto';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';

@Component({
  selector: 'interview-list',
  templateUrl: './interview-list.component.html'
})
export class InterviewListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  constructor(
    private statusProgressService : StatusProgressService,
    private title: Title
  ) {
    this.title.setTitle('Interview | Job Portal Admin')
  }
  interviews!: InterviewGetResDto[]

  ngOnInit(): void {
    this.getInterview()
  }

  getInterview(){
    this.statusProgressService.getInterview().subscribe(result => {
      this.interviews = result
    })
  }
}