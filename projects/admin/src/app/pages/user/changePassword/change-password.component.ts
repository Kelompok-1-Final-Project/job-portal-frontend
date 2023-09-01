import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AuthService } from "@serviceAdmin/auth.service";
import { UserService } from "@serviceAdmin/user.service";
import { first, firstValueFrom } from "rxjs";

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.component.html'
})
export class UserChangePasswordComponent implements OnInit {

    userId!: string
    loading: boolean = false

    userChangePassReqDto = this.fb.group({
        userId: ['', [Validators.required]],
        userOldPass: ['', [Validators.required]],
        userNewPass: ['', [Validators.required]],
        userConfirmNewPass: ['', Validators.required]
    })

    constructor(
        private title: Title,
        private userService: UserService,
        private fb: NonNullableFormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.title.setTitle('Change Password | Job Portal Admin')
    }

    ngOnInit(): void {
        this.getUserId()
        this.userChangePassReqDto.get('userId')?.setValue(this.userId)
    }

    changePassword() {
        this.loading = true
        const data = this.userChangePassReqDto.getRawValue()
        firstValueFrom(this.userService.changePassword(data)).then(result => {
            this.loading = false
            this.router.navigate(['/users/change-password'])
        })
    }

    getUserId() {
        const profile = this.authService.getProfile()
        if (profile) {
            this.userId = profile.userId
        }
    }
}