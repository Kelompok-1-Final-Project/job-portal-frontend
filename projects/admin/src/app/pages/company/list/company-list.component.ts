import { Component, OnInit } from "@angular/core";
import { CompanyGetResDto } from "@dto/company/company.get.res.dto";
import { CompanyService } from "@serviceAdmin/company.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  
  companies!: CompanyGetResDto[]

  constructor(
    private companyService: CompanyService,
    private title: Title
  ) {
    this.title.setTitle('Company | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getCompany();
  }

  getCompany() {
    this.companyService.getAll().subscribe(result => {
      this.companies = result
    })
  }

  // getPhotoUrl(base64String: string): string {
  //   return 'data:image/jpeg;base64,' + base64String;
  // }
}