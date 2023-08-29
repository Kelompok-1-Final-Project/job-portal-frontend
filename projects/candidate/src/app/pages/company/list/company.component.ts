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
import { firstValueFrom } from 'rxjs';


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
    firstValueFrom(this.companyService.getAll()).then(result => {
        this.companyData = result;
    })
  }

  ngOnInit() {
    this.getCompany();
  }

}