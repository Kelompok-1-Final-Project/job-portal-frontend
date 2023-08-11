import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@service/auth.service";
import { LoginService } from "@service/login.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { RoleCode } from "@constant/role.enum";


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    userLoginReqDto = this.fb.group({
        userEmail: ['', [Validators.required]],
        userPassword: ['', [Validators.required]]
    })

    loading: boolean = false

    constructor(private authService: AuthService,
        private fb: NonNullableFormBuilder,
        private loginService: LoginService,
        private router: Router,
        private title: Title) {
        this.title.setTitle('Login | Bootest Anggi')
    }

    onLogin() {
        if (this.userLoginReqDto.valid) {
            const data = this.userLoginReqDto.getRawValue()
            this.loading = true
            this.loginService.login(data).subscribe({
                next: (result) => {
                    localStorage.setItem('data', JSON.stringify(result))
                    this.loading = false
                    if (result.roleCode == RoleCode.CANDIDATE) {
                        this.router.navigateByUrl('/test')
                    }
                    else {
                        this.router.navigateByUrl('/dashboard')
                    }

                },
                error: () => {
                    this.loading = false
                }
            })
        }
    }
}