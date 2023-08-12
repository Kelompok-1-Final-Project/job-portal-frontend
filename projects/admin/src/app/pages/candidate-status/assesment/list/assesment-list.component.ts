import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'assesment-list',
  templateUrl: './assesment-list.component.html'
})
export class AssesmentListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  constructor() {}
  assesments = [
    {
      candidateId: 'CAND001',
      candidateName: 'Torangto Situngkir',
      jobName: 'Software Engineer',
      hrName: 'Jane Smith',
      schedule: '2023-08-15',
      notes: 'Good technical skills'
    },
    {
      candidateId: 'CAND002',
      candidateName: 'M Firman',
      jobName: 'UI/UX Designer',
      hrName: 'John Doe',
      schedule: '2023-08-17',
      notes: 'Excellent communication'
    },
    {
      candidateId: 'CAND002',
      candidateName: 'Anggi Wirahmat',
      jobName: 'UI/UX Designer',
      hrName: 'John Doe',
      schedule: '2023-08-17',
      notes: 'Excellent communication'
    },
  ];

  modalUpdate(id:number){
    this.visibleUpdateStatus=true;
  }

  updateStatus(row: any) {
  }

  ngOnInit(): void {}
}