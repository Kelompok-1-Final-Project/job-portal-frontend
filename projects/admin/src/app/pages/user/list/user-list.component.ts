import { Component, OnInit } from "@angular/core";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { UserService } from "@serviceAdmin/user.service";
import { Title } from "@angular/platform-browser";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  visibleAssign: boolean = false;
  users!: UserGetResDto[]
  visibleIsActive: boolean = false
  checked: boolean = false
  searchText: string = ''

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
    firstValueFrom(this.userService.getAll()).then(result => {
      this.users = result
    })
  }

  insertIsActive() {
    const data = this.userIsActiveReqDto.getRawValue()
    firstValueFrom(this.userService.setIsActive(data)).then(result => {
      this.visibleIsActive = false
      this.getAllUser()
    })
  }


  setActive(id: string, value: boolean) {
    this.visibleIsActive = true
    this.userIsActiveReqDto.get("userId")?.setValue(id)
    this.userIsActiveReqDto.get("isActive")?.setValue(value)
  }

  switchIsActive(event: MouseEvent, user: any) {
    event.stopPropagation()
    this.setActive(user.userId, !user.isActive)
  }

  modalHide(){
    this.getAllUser()
  }

}