import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { GenderGetResDto } from "@dto/profile/gender.get.res.dto";
import { MaritalGetResDto } from "@dto/profile/marital.get.res.dto";
import { PersonTypeGetResDto } from "@dto/profile/person-type.get.res.dto";
import { CandidateService } from "@serviceAdmin/candidate.service";
import { ProfileService } from "@serviceAdmin/profile.service";
import { FileUpload } from "primeng/fileupload";

@Component({
  selector: 'candidate-insert',
  templateUrl: './candidate-insert.component.html'
})
export class CandidateInsertComponent implements OnInit, AfterViewChecked {

  marital!: MaritalGetResDto[]
  gender!: GenderGetResDto[]
  personType!: PersonTypeGetResDto[]

  candidateInsertReqDto = this.fb.group({
    photoExt: [''],
    photoFiles: [''],
    email: [''],
    fullName: [''],
    idNumber: [''],
    mobileNumber: [''],
    genderCode: [''],
    cvExt: [''],
    cvFiles: [''],
    expectedSalary: [''],
    birthdate: [''],
    maritalStatusCode: [''],
    personTypeCode: [''],
    summary: ['']
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private profileService: ProfileService,
    private candidateService: CandidateService
  ) {
    this.title.setTitle('Insert Candidate | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getMaritalStatus()
    this.getGender()
    this.getPersonType()
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges()
  }

  getMaritalStatus() {
    this.profileService.getMaritalStatus().subscribe(result => {
      this.marital = result
    })
  }

  getGender() {
    this.profileService.getGender().subscribe(result => {
      this.gender = result
    })
  }

  getPersonType() {
    this.profileService.getPersonType().subscribe(result => {
      this.personType = result
    })
  }

  insertCandidate() {
    const data = this.candidateInsertReqDto.getRawValue()
    this.candidateService.insert(data).subscribe(result => {
      this.router.navigateByUrl('/candidates')
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

        this.candidateInsertReqDto.patchValue({
          photoFiles: resultBase64,
          photoExt: resultExtension
        })
        fileUpload.clear();

      })
    }
  }

  cvUpload(event: any, fileUpload: FileUpload) {
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

        this.candidateInsertReqDto.patchValue({
          cvFiles: resultBase64,
          cvExt: resultExtension
        })
        fileUpload.clear();

      })
    }
  }
}