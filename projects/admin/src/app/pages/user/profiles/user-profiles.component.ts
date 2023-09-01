import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { AuthService } from "@serviceAdmin/auth.service";
import { UserService } from "@serviceAdmin/user.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'user-profiles',
    templateUrl: 'user-profiles.component.html'
})
export class UserProfilesComponent implements OnInit{

    profile?: UserGetResDto
    profileId!: string

    constructor(
        private title : Title,
        private authService: AuthService,
        private userService: UserService
    ){
        this.title.setTitle('User Profile | Job Portal Admin')
    }   

    ngOnInit(): void {
        this.getProfile()
        this.getDetail()
    }

    getProfile(){
        const profile = this.authService.getProfile()
        if(profile){
            this.profileId = profile.userId
        }
    }

    getDetail(){
        firstValueFrom(this.userService.getDetail(this.profileId)).then(result => {
            this.profile = result
        })
    }
}