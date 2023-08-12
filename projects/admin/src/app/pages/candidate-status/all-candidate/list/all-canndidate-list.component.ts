import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'all-candidate-list',
  templateUrl: './all-candidate-list.component.html'
})
export class AllCandidateListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  constructor() {}
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

  modalUpdate(id:number){
    this.visibleUpdateStatus=true;
  }

  updateStatus(row: any) {
  }

  ngOnInit(): void {}
}