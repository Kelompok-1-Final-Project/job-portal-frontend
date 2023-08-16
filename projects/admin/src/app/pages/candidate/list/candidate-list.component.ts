import { Component, OnInit } from "@angular/core";
import { CandidateService } from "../../../services/candidate.service";
import { Title } from "@angular/platform-browser";
import { CandidateGetResDto } from "@dto/candidate/candidate.get.res.dto";

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
    this.candidateService.getAll().subscribe(result => {
      this.candidates = result
    })
  }

  // getPhotoUrl(base64String: string): string {
  //     return 'data:image/jpeg;base64,' + base64String;
  //   }

  assign(id: number) {
    this.visibleAssign = true;
  }
}