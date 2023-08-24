import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { CityGetResDto } from "@dto/city/city.get.res.dto";
import { IndustryGetResDto } from "@dto/industry/industry.get.res.dto";
import { CityService } from "@serviceAdmin/city.service";
import { CompanyService } from "@serviceAdmin/company.service";
import { IndustryService } from "@serviceAdmin/industry.service";
import { FileUpload } from "primeng/fileupload";
import { Subscription } from "rxjs";

@Component({
  selector: 'company-insert',
  templateUrl: './company-insert.component.html'
})
export class CompanyInsertComponent implements AfterViewChecked, OnDestroy {

  industries!: IndustryGetResDto[]
  cities!: CityGetResDto[]
  companySubscription?: Subscription
  industrySubcription?: Subscription
  citySubscription?: Subscription

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

  ngOnDestroy(): void {
    this.companySubscription?.unsubscribe()
  }

  insertCompany() {
    const data = this.companyInsertReqDto.getRawValue()
    this.companySubscription = this.companyService.insert(data).subscribe(result => {
      this.router.navigateByUrl('/companies')
    })
  }

  getIndustry() {
    this.industrySubcription = this.industryService.getAll().subscribe(result => {
      this.industries = result
    })
  }

  getCity() {
    this.citySubscription = this.cityService.getAll().subscribe(result => {
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