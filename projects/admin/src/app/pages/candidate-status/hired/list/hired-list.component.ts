import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'hired-list',
  templateUrl: './hired-list.component.html'
})
export class HiredListComponent implements OnInit {

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