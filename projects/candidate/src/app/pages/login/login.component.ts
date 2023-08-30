import {
  Component
} from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import {
  Router
} from "@angular/router";
import {
  Title
} from "@angular/platform-browser";
import {
  LoginService
} from "@serviceCandidate/login.service";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLoginReqDto = this.fb.group({
    userEmail: ['', [Validators.email,Validators.required]],
    userPassword: ['', [Validators.required]]
  })

  loading: boolean = false

  constructor(
    private fb: NonNullableFormBuilder,
    private loginService: LoginService,
    private router: Router,
    private title: Title) {
    this.title.setTitle('Login | InLook')
  }

  onLogin() {
    if (this.userLoginReqDto.valid) {
      const data = this.userLoginReqDto.getRawValue()
      this.loading = true
      this.loginService.login(data).subscribe({
        next: (result) => {
          localStorage.setItem('data', JSON.stringify(result))
          this.loading = false
          this.router.navigateByUrl('/home')
        },
        error: () => {
          this.loading = false
        }
      })
    }
  }
}