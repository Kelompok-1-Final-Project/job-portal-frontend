import {
  Component,
  OnInit
} from '@angular/core';


@Component({
  selector: 'vacancy-detail',
  templateUrl: './vacancy-detail.component.html'
})
export class VacancyDetailComponent implements OnInit {
  visibleAssignJob:boolean=false;
  constructor() {}

  selectedCategories: any[] = [];

  categories: any[] = [
      { name: 'Internship', key: 'ET001' },
      { name: 'Contract', key: 'ET002' },
      { name: 'Full Time', key: 'ET003' },
      { name: 'Part Time', key: 'ET004' }
  ];
  companyIndustries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Healthcare',
    'Education',
    'Technology',
    'Finance',
  ];

  benefits = [
    'Asuransi kesehatan',
    'Fasilitas olahraga',
    'Laptop',
    'Lunch gratis',
    'Transportasi',
    'Program pengembangan karyawan',
  ];

  ngOnInit(){
  }

  assignJob(id:number){
    this.visibleAssignJob=true;
  }

}