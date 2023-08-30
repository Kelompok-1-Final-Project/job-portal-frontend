import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { UserService } from "@serviceAdmin/user.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'user-detail',
    templateUrl: 'user-detail.component.html'
})
export class UserDetailComponent implements OnInit{

    detailUser?: UserGetResDto
    userId!: string

    constructor(
        private title: Title,
        private userService: UserService,
        private route: ActivatedRoute
    ){
        this.title.setTitle('User Detail | Job Portal Admin')
    }

    ngOnInit(): void {
        firstValueFrom(this.route.params).then(param => {
            this.userId = param['id']
            this.getDetailUser()
        })
    }

    getDetailUser(){
        firstValueFrom(this.userService.getDetail(this.userId)).then(result => {
            this.detailUser = result
        })
    }

}