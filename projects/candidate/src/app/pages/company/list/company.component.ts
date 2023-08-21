import {
  Component,
  OnInit
} from '@angular/core';
import {
  NonNullableFormBuilder
} from '@angular/forms';
import {
  Title
} from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { CompanyDataGetResDto } from '@dto/company/company-data.get.res.dto';
import { CompanyService } from '@serviceCandidate/company.service';


@Component({
  selector: 'company',
  templateUrl: './company.component.html'
})
export class CompanyListComponent implements OnInit {

  idCompany: string=``;
  companyData!: CompanyDataGetResDto[]; 

  constructor(
    private companyService: CompanyService,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  getCompany() {
    this.companyService.getAll().subscribe(result => {
        this.companyData = result;
    })
  }

  ngOnInit() {
    this.getCompany();
  }

}