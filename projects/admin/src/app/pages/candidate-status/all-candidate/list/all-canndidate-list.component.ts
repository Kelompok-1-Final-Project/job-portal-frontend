import {
  Component,
  OnInit
} from '@angular/core';

interface City {
  name: string;
}

@Component({
  selector: 'all-candidate-list',
  templateUrl: './all-candidate-list.component.html'
})
export class AllCandidateListComponent implements OnInit {

  cities: City[] | undefined;
  visibleUpdateStatus: boolean = false;
  constructor() { }
  jobs = [{
    candidateName: 'Anggi Wirahmat',
    jobTitle: 'Software Engineer',
    status: 'Application'
  },
  {
    candidateName: 'M Firman',
    jobTitle: 'Backend-Developer',
    status: 'Medical Check-Up'
  },
  {
    candidateName: 'Torangto Situngkir',
    jobTitle: 'Fullstack Developer',
    status: 'Assesment'
  },
  ];

  status = ['Application', 'Assessment', 'Medical Checkup', 'Interview', 'Offering', 'Hired']

  modalUpdate(id: number) {
    this.visibleUpdateStatus = true;
  }

  updateStatus(row: any) {
  }

  ngOnInit(): void {
    this.cities = [
      { name: 'Application'},
      { name: 'Assessment' },
      { name: 'Medical Checkup' },
      { name: 'Interview' },
      { name: 'Offering' },
      { name: 'Hired' },
      { name: 'Blacklist' },
      { name: 'Rejected' }
    ];
  }
}