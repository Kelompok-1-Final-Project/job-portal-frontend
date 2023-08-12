import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'interview-list',
  templateUrl: './interview-list.component.html'
})
export class InterviewListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  constructor() {}
  interviews = [
    {
      interviewId: 'ASDAS',
      candidateName: 'Torangto Situngkir',
      jobTitle: 'Software Engineer',
      interviewerName: 'Julian Wicaksono',
      schedule: '2023-08-15 10:00 AM',
      notes: 'Candidate performed well in technical assessment.'
    },
    {
      interviewId: 'ASFA',
      candidateName: 'Anggi Wirahmat',
      jobTitle: 'Data Analyst',
      interviewerName: 'Budi Santoso',
      schedule: '2023-08-20 02:30 PM',
      notes: 'Candidate had relevant experience in data analysis.'
    },
    {
      interviewId: 'DFSG',
      candidateName: 'M Firman',
      jobTitle: 'Sales Representative',
      interviewerName: 'Deddy Corbuzier',
      schedule: '2023-08-25 09:15 AM',
      notes: 'Candidate demonstrated strong communication skills.'
    },
  ];

  modalUpdate(id:number){
    this.visibleUpdateStatus=true;
  }

  updateStatus(row: any) {
  }

  ngOnInit(): void {}
}