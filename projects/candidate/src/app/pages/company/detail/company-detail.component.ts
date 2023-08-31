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
  selector: 'company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  idCompany: string=``;
  companyData!: CompanyDataGetResDto;
  linkTo!:string; 

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  init() {
    firstValueFrom(this.activatedRoute.params).then(id => {
      this.idCompany = String(Object.values(id));
      this.getCompany();
    })
  }

  getCompany() {
    firstValueFrom(this.companyService.getById(this.idCompany)).then(result => {
        this.companyData = result;
    })
  }

  ngOnInit() {
    this.init();
    this.linkTo = '/companies'
  }

}