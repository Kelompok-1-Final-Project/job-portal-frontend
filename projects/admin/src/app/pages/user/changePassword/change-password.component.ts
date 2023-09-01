import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { AuthService } from "@serviceAdmin/auth.service";
import { UserService } from "@serviceAdmin/user.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.component.html'
})
export class UserChangePasswordComponent implements OnInit{

    userId!: string

    userChangePasswordReqDto = this.fb.group({
        userId: ['', [Validators.required]],
        userOldPass: ['', [Validators.required]],
        userNewPass: ['', [Validators.required]],
        userConfirmNewPass: ['', Validators.required]
    })

    constructor(
        private title: Title,
        private userService: UserService,
        private fb: NonNullableFormBuilder,
        private authService: AuthService
    ){
        this.title.setTitle('Change Password | Job Portal Admin')
    }

    ngOnInit(): void {
        this.getUserId()
    }

    changePassword(){
        const data = this.userChangePasswordReqDto.getRawValue()
        firstValueFrom(this.userService.changePassword(data)).then(result => {

        })
    }

    getUserId(){
        const profile = this.authService.getProfile()
        if(profile){
            this.userId = profile.userId
        }
    }
}