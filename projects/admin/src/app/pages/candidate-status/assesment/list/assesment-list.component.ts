import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AssessmentGetResDto } from '@dto/assessment/assessment.get.res.dto';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';

@Component({
  selector: 'assesment-list',
  templateUrl: './assesment-list.component.html'
})
export class AssesmentListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  assesments!: AssessmentGetResDto[]

  constructor(
    private title: Title,
    private statusProgressService: StatusProgressService
  ){
    this.title.setTitle('Asessment | Job Portal Admin')
  }
  
  ngOnInit(): void {
    this.getAssessment()
  }

  getAssessment(){
    this.statusProgressService.getAssessment().subscribe(result => {
      this.assesments = result
    })
  }

  

}