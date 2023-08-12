import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'mcu-list',
  templateUrl: './mcu-list.component.html'
})
export class McuListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  constructor() {}
  mcus = [
    {
      candidateId: 'CAND001',
      candidateName: 'Torangto Situngkir',
    },
    {
      candidateId: 'CAND002',
      candidateName: 'M Firman',
    },
    {
      candidateId: 'CAND002',
      candidateName: 'Anggi Wirahmat',
    },
  ];

  modalUpdate(id:number){
    this.visibleUpdateStatus=true;
  }

  updateStatus(row: any) {
  }

  ngOnInit(): void {}
}