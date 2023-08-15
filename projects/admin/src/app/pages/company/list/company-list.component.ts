import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  companies = [
    {
      id: 1,
      companyCode: 'CP001',
      companyName: 'PT Lawencon',
      companyIndustry: 'Technology',
      companyAddress: 'Jakarta Selatan',
      files: 'path-to-image-1.png'
    },
    {
      id: 2,
      companyCode: 'CP002',
      companyName: 'Pt LiNov Prestasi',
      companyIndustry: 'Finance',
      companyAddress: 'Surabaya',
      files: 'path-to-image-2.png'
    },
    // Add more companies as needed
  ];

  constructor() {

  }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
    // this.companyService.getCompanies(true).subscribe(result => {
    //     this.companies= result;
    // })
  }

  getPhotoUrl(base64String: string): string {
    return 'data:image/jpeg;base64,' + base64String;
  }
}