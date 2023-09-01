import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { LoginService } from "@serviceAdmin/login.service";
import { firstValueFrom } from "rxjs";


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    userLoginReqDto = this.fb.group({
        userEmail: ['', [Validators.required, Validators.email]],
        userPassword: ['', [Validators.required]]
    })

    loading: boolean = false

    constructor(
        private fb: NonNullableFormBuilder,
        private loginService: LoginService,
        private router: Router,
        private title: Title) {
        this.title.setTitle('Login | Job Portal Admin')
    }

    onLogin() {
        if (this.userLoginReqDto.valid) {
            const data = this.userLoginReqDto.getRawValue()
            this.loading = true

            firstValueFrom(this.loginService.login(data))
                .then(result => {
                    localStorage.setItem('data', JSON.stringify(result))
                    this.loading = false
                    this.router.navigateByUrl('/dashboard')
                }).catch(() => {
                    this.loading = false
                })
        } else {
            console.log('Invalid Login')
        }
    }
}