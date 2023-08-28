import { Component, OnInit } from "@angular/core";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { UserService } from "@serviceAdmin/user.service";
import { Title } from "@angular/platform-browser";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  visibleAssign: boolean = false;
  users!: UserGetResDto[]
  visibleIsActive: boolean = false
  checked: boolean = false

  userIsActiveReqDto = this.fb.group({
    userId: ['', [Validators.required]],
    isActive: [false, [Validators.required]]
  })

  constructor(
    private userService: UserService,
    private title: Title,
    private fb: NonNullableFormBuilder
  ) {
    this.title.setTitle('List User | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser() {
    this.userService.getAll().subscribe(result => {
      this.users = result
    })
  }

  insertIsActive() {
    const data = this.userIsActiveReqDto.getRawValue()
    firstValueFrom(this.userService.setIsActive(data)).then(result =>{
      this.visibleIsActive = false
    })
  }

  setActive(id: string, value: boolean) {
    this.visibleIsActive = true
    this.userIsActiveReqDto.get("userId")?.setValue(id)
    this.userIsActiveReqDto.get("isActive")?.setValue(value)
  }

}