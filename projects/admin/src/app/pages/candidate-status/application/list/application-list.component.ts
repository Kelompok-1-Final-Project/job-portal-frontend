import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'application-list',
  templateUrl: './application-list.component.html'
})
export class ApplicationListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  constructor() {}
  jobs = [{
      candidateName: 'Anggi Wirahmat',
      jobTitle: 'Software Engineer',
    },
    {
      candidateName: 'M Firman',
      jobTitle: 'Backend-Developer',
    },
    {
      candidateName: 'Torangto Situngkir',
      jobTitle: 'Fullstack Developer',
    },
  ];

  modalUpdate(id:number){
    this.visibleUpdateStatus=true;
  }

  updateStatus(row: any) {
  }

  ngOnInit(): void {}
}