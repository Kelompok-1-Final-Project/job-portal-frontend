import {
  Component,
  OnInit
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RoleName } from '@constant/role.enum';
import { AssessmentGetResDto } from '@dto/assessment/assessment.get.res.dto';
import { AuthService } from '@serviceAdmin/auth.service';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'assesment-list',
  templateUrl: './assesment-list.component.html',
  styleUrls: ['./assesment-list.component.css']
})
export class AssesmentListComponent implements OnInit {

  visibleUpdateStatus: boolean = false
  assesments!: AssessmentGetResDto[]
  visibleUpdateNotes: boolean = false
  userId!: string
  search: string = ''
  loading: boolean = false
  isInterview!: boolean

  updateAssessmentNotesReqDto = this.fb.group({
    assessmentId: ['', [Validators.required]],
    notes: ['', [Validators.required]]
  })

  constructor(
    private title: Title,
    private fb: NonNullableFormBuilder,
    private statusProgressService: StatusProgressService,
    private authService: AuthService
  ) {
    this.title.setTitle('Assessment | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getRole()
    this.getProfile()
    this.getAssessment()
  }

  getAssessment() {
    firstValueFrom(this.statusProgressService.getAssessment(this.userId)).then(result => {
      this.assesments = result
    })
  }

  insertNotes() {
    this.loading = true
    const data = this.updateAssessmentNotesReqDto.getRawValue()
    firstValueFrom(this.statusProgressService.updateAssessmentNotes(data)).then(result => {
      this.loading = false
      this.visibleUpdateNotes = false
      this.getAssessment()
      this.updateAssessmentNotesReqDto.get('notes')?.setValue('')
    })
  }

  addNotes(id: string) {
    this.visibleUpdateNotes = true
    this.updateAssessmentNotesReqDto.get('assessmentId')?.setValue(id)
  }

  getProfile() {
    const profile = this.authService.getProfile()
    if (profile) {
      this.userId = profile.userId
    }
  }

  getRole(){
    const profile = this.authService.getProfile()
    if(profile && profile.roleCode==RoleName.INTERVIEWER){
      this.isInterview = true
    }
  }
}