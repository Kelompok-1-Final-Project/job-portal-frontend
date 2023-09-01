import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { GenderGetResDto } from "@dto/profile/gender.get.res.dto";
import { RoleGetResDto } from "@dto/profile/role.get.res.dto";
import { ProfileService } from "@serviceAdmin/profile.service";
import { UserService } from "@serviceAdmin/user.service";
import { FileUpload } from "primeng/fileupload";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'user-insert',
  templateUrl: './user-insert.component.html'
})
export class UserInsertComponent implements AfterViewChecked {

  roles!: RoleGetResDto[]
  genders!: GenderGetResDto[]
  loading: boolean = false

  userInsertReqDto = this.fb.group({
    userEmail: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    roleCode: ['', [Validators.required]],
    userPhone: [''],
    genderCode: [''],
    file: [''],
    ext: ['']
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private profileService: ProfileService,
    private userService: UserService

  ) {
    this.title.setTitle('Insert User | InLook ')
  }

  ngOnInit(): void {
    this.getRole()
    this.getGender()
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges()
  }

  getRole() {
    firstValueFrom(this.profileService.getRole()).then(result => {
      this.roles = result
    })
  }

  getGender() {
    firstValueFrom(this.profileService.getGender()).then(result => {
      this.genders = result
    })
  }

  insertUser() {
    this.loading = true
    const data = this.userInsertReqDto.getRawValue()
    firstValueFrom(this.userService.insert(data)).then(result => {
      this.loading = false
      this.router.navigateByUrl('/users')
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

        this.userInsertReqDto.patchValue({
          file: resultBase64,
          ext: resultExtension
        })
        fileUpload.clear();

      })
    }
  }
}