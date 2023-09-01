import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { AuthService } from "@serviceAdmin/auth.service";
import { UserService } from "@serviceAdmin/user.service";
import { FileUpload } from "primeng/fileupload";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'update-profiles',
  templateUrl: 'update-profiles.component.html'
})
export class UpdateProfilesComponent implements OnInit {

  profileId!: string
  profile?: UserGetResDto

  userUpdateProfileReqDto = this.fb.group({
    userId: ['', [Validators.required]],
    fullName: ['', [Validators.required]],
    mobileNumber: ['', [Validators.required]],
    genderId: ['', [Validators.required]],
    email: ['', [Validators.required]],
    file: ['', [Validators.required]],
    ext: ['', [Validators.required]],
    roleId: ['', [Validators.required]]
  })

  constructor(
    private title: Title,
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.title.setTitle('Update Profile | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getProfile()
    this.getDetailProfile()
    this.userUpdateProfileReqDto.get('userId')?.setValue(this.profileId)
  }

  getProfile() {
    const profile = this.authService.getProfile()
    if (profile) {
      this.profileId = profile.userId
    }
  }

  getDetailProfile() {
    firstValueFrom(this.userService.getDetail(this.profileId)).then(result => {
      this.profile = result
    })
  }

  updateProfile() {
    const data = this.userUpdateProfileReqDto.getRawValue()
    firstValueFrom(this.userService.update(data)).then(result => {
      this.router.navigateByUrl('/users/profiles')
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

        this.userUpdateProfileReqDto.patchValue({
          file: resultBase64,
          ext: resultExtension
        })
        fileUpload.clear();

      })
    }
  }
}