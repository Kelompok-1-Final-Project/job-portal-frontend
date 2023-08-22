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
  selector: 'company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {

  idCompany: string=``;
  companyData!: CompanyDataGetResDto; 

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  init() {
    this.activatedRoute.params.subscribe(id => {
      this.idCompany = String(Object.values(id));
    })
  }

  getCompany() {
    this.companyService.getById(this.idCompany).subscribe(result => {
        this.companyData = result;
        console.log('test:'+result);
    })
  }

  ngOnInit() {
    this.init();
    this.getCompany();
  }

}