import {
  Component, OnInit
} from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import {
  Title
} from "@angular/platform-browser";
import {
  Router
} from "@angular/router";
import { AuthService } from "@serviceCandidate/auth.service";
import {
  UserService
} from "@serviceCandidate/user.service";

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit{
  
    userId!:string;
    loading: boolean = false;

    constructor(
    private userService: UserService,
    private authService : AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private title: Title) {
    this.title.setTitle('Change Password | InLook')
  }

  userChangePassReqDto = this.fb.group({
    userId:[''],
    userOldPass: ['', [Validators.required]],
    userNewPass: ['', [Validators.required]],
    userConfirmNewPass: ['', [Validators.required]],
  })

  ngOnInit(): void {
      this.userId = this.authService.getUserId();
  }

  updatePass() {
          const data = this.userChangePassReqDto.getRawValue()
          data.userId = this.userId;
          this.userService.changePassword(data).subscribe({
            next: (result) => {
              localStorage.clear()
              this.router.navigateByUrl('/login')
              this.loading = false
            },
            error: () => {
              this.loading = false
            }
          })
  }
}