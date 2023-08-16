import {
  Component,
  OnInit
} from '@angular/core';


@Component({
  selector: 'save-jobs',
  templateUrl: './save-jobs.component.html'
})
export class SaveJobsComponent implements OnInit {

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


  ngOnInit(){
  }

}