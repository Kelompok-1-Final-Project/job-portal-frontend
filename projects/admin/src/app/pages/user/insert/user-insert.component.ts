import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { GenderGetResDto } from "@dto/profile/gender.get.res.dto";
import { RoleGetResDto } from "@dto/profile/role.get.res.dto";
import { ProfileService } from "@serviceAdmin/profile.service";
import { UserService } from "@serviceAdmin/user.service";

@Component({
  selector: 'user-insert',
  templateUrl: './user-insert.component.html'
})
export class UserInsertComponent implements AfterViewChecked {

  roles!: RoleGetResDto[]
  genders!: GenderGetResDto[]

  userInsertReqDto = this.fb.group({
    userEmail: [''],
    fullName: [''],
    roleCode: [''],
    userPhone: [''],
    genderCode: ['']
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
    this.profileService.getRole().subscribe(result => {
      this.roles = result
    })
  }

  getGender() {
    this.profileService.getGender().subscribe(result => {
      this.genders = result
    })
  }

  insertUser(){
    const data = this.userInsertReqDto.getRawValue()
    this.userService.insert(data).subscribe(result => {
      this.router.navigateByUrl('/users')
    })
  }
}