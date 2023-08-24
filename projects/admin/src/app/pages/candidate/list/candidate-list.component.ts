import { Component, OnInit } from "@angular/core";
import { CandidateService } from "@serviceAdmin/candidate.service";
import { Title } from "@angular/platform-browser";
import { CandidateGetResDto } from "@dto/candidate/candidate.get.res.dto";
import { first, firstValueFrom } from "rxjs";

interface Candidates {
  nik: string,
  name: string,
  email: string,
  mobileNumber: string
}

interface Vacancies {
  code: string,
  vacancyTitle: string,
  hrPic: string,
  userPic: string,
  position: string,
  endDate: string
}

@Component({
  selector: 'candidate-list',
  templateUrl: './candidate-list.component.html'
})
export class CandidateListComponent implements OnInit {
  visibleAssign: boolean = false;
  candidates!: CandidateGetResDto[]
  selectedCandidates!: Candidates;
  vacancies: Vacancies[] = [
    {
      code: 'C001',
      vacancyTitle: 'Software Developer',
      hrPic: 'John HR',
      userPic: 'Jane User',
      position: 'Developer',
      endDate: '2023-08-31'
    },
    {
      code: 'C002',
      vacancyTitle: 'Data Analyst',
      hrPic: 'Alice HR',
      userPic: 'Bob User',
      position: 'Analyst',
      endDate: '2023-09-15'
    },
    {
      code: 'C003',
      vacancyTitle: 'Sales Representative',
      hrPic: 'Eva HR',
      userPic: 'David User',
      position: 'Sales',
      endDate: '2023-09-30'
    }
  ];
  selectedVacancies!: Vacancies;

  constructor(
    private candidateService: CandidateService,
    private title: Title
  ) {
    this.title.setTitle('Candidate | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getAllCandidate()
  }

  getAllCandidate() {
    firstValueFrom(this.candidateService.getAll()).then(result => {
      this.candidates = result
    })
  }

  assign(id: number) {
    this.visibleAssign = true;
  }
}