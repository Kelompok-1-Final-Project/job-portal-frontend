import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { GenderGetResDto } from "@dto/profile/gender.get.res.dto";
import { RoleGetResDto } from "@dto/profile/role.get.res.dto";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { ProfileService } from "@serviceAdmin/profile.service";
import { UserService } from "@serviceAdmin/user.service";
import { FileUpload } from "primeng/fileupload";
import { firstValueFrom } from "rxjs";

interface Country {
  name: string;
}

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit, AfterViewChecked {

  userId!: string
  user?: UserGetResDto
  roles!: RoleGetResDto[]
  genders!: GenderGetResDto[]
  loading: boolean = false

  userUpdateReqDto = this.fb.group({
    userId: ['', [Validators.required]],
    email: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    mobileNumber: [''],
    genderId: [''],
    file: [''],
    ext: [''],
    roleId: ['', [Validators.required]]
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private route: ActivatedRoute,
    private userService: UserService,
    private profileService: ProfileService
  ) {
    this.title.setTitle('Update User | Job Portal Admin')
  }

  ngOnInit(): void {
    firstValueFrom(this.route.params).then(param => {
      this.userId = param['id']
      this.getDetail()
    })
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges()
  }

  getDetail() {
    firstValueFrom(this.userService.getDetail(this.userId)).then(result => {
      this.user = result
      this.userUpdateReqDto.get('email')?.setValue(this.user.userEmail)
      this.userUpdateReqDto.get('userId')?.setValue(this.userId)
      this.getGender()
      this.getRole()
    })
  }

  getGender() {
    firstValueFrom(this.profileService.getGender()).then(result => {
      this.genders = result
    })
  }

  getRole() {
    firstValueFrom(this.profileService.getRole()).then(result => {
      this.roles = result
    })
  }

  updateUser() {
    this.loading = true
    const data = this.userUpdateReqDto.getRawValue()
    firstValueFrom(this.userService.update(data)).then(result => {
      this.loading = false
      this.router.navigate(['/users/detail/', this.userId])
    })
  }

  photoUpload(event: any, fileUpload: FileUpload) {
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

        this.userUpdateReqDto.patchValue({
          file: resultBase64,
          ext: resultExtension
        })
        fileUpload.clear();

      })
    }
  }
}