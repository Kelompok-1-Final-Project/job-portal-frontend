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
import { AuthService } from "@serviceCandidate/auth.service";
import { firstValueFrom } from "rxjs";


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
    private auth : AuthService,
    private router: Router,
    private title: Title) {
    this.title.setTitle('Login | InLook')
  }

  onLogin() {
    if (this.userLoginReqDto.valid) {
      const testPage = this.auth.getTest()
      const data = this.userLoginReqDto.getRawValue()
      this.loading = true
      firstValueFrom(this.loginService.login(data))
          .then(result => {
          localStorage.setItem('data', JSON.stringify(result))
          this.loading = false
          if(testPage != null && testPage != undefined){
            this.router.navigateByUrl(`/tests/${testPage.jobId}`)
          }else{
            this.router.navigateByUrl('/home')
          }
        }).catch(() => {
          this.loading = false
        })
      }else{
        console.log('Invalid Login');
      }
    }
  }