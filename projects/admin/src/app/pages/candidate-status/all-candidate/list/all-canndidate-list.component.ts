import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CandidateProgressGetResDto } from '@dto/candidateprogress/candidate-progress.get.res.dto';
import { StatusProgressGetResDto } from '@dto/progress/status-progress.get.res.dto';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';
import { firstValueFrom } from 'rxjs';

interface City {
  name: string;
}

@Component({
  selector: 'all-candidate-list',
  templateUrl: './all-candidate-list.component.html',
  styleUrls: ['./all-candidate-list.component.css']
})
export class AllCandidateListComponent implements OnInit {

  cities: City[] | undefined;
  visibleUpdateStatus: boolean = false;
  status!: StatusProgressGetResDto[]
  candidates!: CandidateProgressGetResDto[]

  constructor(
    private title: Title,
    private statusProgressService: StatusProgressService
  ) {
    this.title.setTitle('Candidate Progress | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getStatus()
    this.getCandidateStatus()
  }

  getStatus() {
    firstValueFrom(this.statusProgressService.getStatus()).then(result => {
      this.status = result
    })
  }

  getCandidateStatus() {
    firstValueFrom(this.statusProgressService.getCandidateStatus()).then(result => {
      this.candidates = result
    })
  }
}