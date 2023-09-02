import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { CityGetResDto } from "@dto/city/city.get.res.dto";
import { IndustryGetResDto } from "@dto/industry/industry.get.res.dto";
import { CityService } from "@serviceAdmin/city.service";
import { CompanyService } from "@serviceAdmin/company.service";
import { IndustryService } from "@serviceAdmin/industry.service";
import { firstValueFrom } from "rxjs";

interface Country {
  name: string;
}

@Component({
  selector: 'company-update',
  templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent {

  cities!: CityGetResDto[]
  industries!: IndustryGetResDto[]
  code!: string
  loading: boolean = false

  companyUpdateReqDto = this.fb.group({
    companyName: ['', [Validators.required]],
    companyCode: ['', [Validators.required]],
    industryCode: ['', [Validators.required]],
    cityCode: ['', [Validators.required]],
    description: ['', [Validators.required]],
    address: ['', [Validators.required]],
    file: ['', [Validators.required]],
    ext: ['', [Validators.required]]
  })

  constructor(
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private title: Title,
    private cityService: CityService,
    private industryService: IndustryService,
    private companyService: CompanyService
  ) {
    this.title.setTitle('Update Company | Job Portal Admin')
  }

  ngOnInit(): void {
    firstValueFrom(this.route.params).then(param => {
      this.code = param['id']
      this.getCity()
      this.getIndustry()
      this.companyUpdateReqDto.get('companyCode')?.setValue(this.code)
    })

  }

  updateCompany() {
    this.loading = true
    const data = this.companyUpdateReqDto.getRawValue()
    firstValueFrom(this.companyService.update(data)).then(result => {
      this.loading = false
      this.router.navigateByUrl('/companies')
    })
  }

  getIndustry() {
    firstValueFrom(this.industryService.getAll()).then(result => {
      this.industries = result
    })
  }

  getCity() {
    firstValueFrom(this.cityService.getAll()).then(result => {
      this.cities = result
    })
  }

  fileUpload(event: any) {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)
        this.companyUpdateReqDto.patchValue({
          ext: resultExtension,
          file: resultBase64
        })
      })
    }
  }
}