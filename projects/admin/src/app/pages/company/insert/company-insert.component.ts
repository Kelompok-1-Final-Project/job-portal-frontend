import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { CityGetResDto } from "@dto/city/city.get.res.dto";
import { IndustryGetResDto } from "@dto/industry/industry.get.res.dto";
import { CityService } from "@serviceAdmin/city.service";
import { CompanyService } from "@serviceAdmin/company.service";
import { IndustryService } from "@serviceAdmin/industry.service";
import { FileUpload } from "primeng/fileupload";
import { Subscription, firstValueFrom } from "rxjs";

@Component({
  selector: 'company-insert',
  templateUrl: './company-insert.component.html'
})
export class CompanyInsertComponent implements AfterViewChecked {

  industries!: IndustryGetResDto[]
  cities!: CityGetResDto[]
  loading: boolean = false

  companyInsertReqDto = this.fb.group({
    companyName: ['', [Validators.required]],
    industryCode: ['', [Validators.required]],
    cityCode: ['', [Validators.required]],
    ext: ['', [Validators.required]],
    file: ['', [Validators.required]],
    address: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private companyService: CompanyService,
    private cityService: CityService,
    private industryService: IndustryService
  ) {
    this.title.setTitle('Company Insert | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getCity()
    this.getIndustry()
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges()
  }

  insertCompany() {
    this.loading = true
    const data = this.companyInsertReqDto.getRawValue()
    firstValueFrom(this.companyService.insert(data)).then(result => {
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

  photosUpload(event: any, fileUpload: FileUpload) {
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

        this.companyInsertReqDto.patchValue({
          file: resultBase64,
          ext: resultExtension
        })
        fileUpload.clear();

      })
    }
  }
}