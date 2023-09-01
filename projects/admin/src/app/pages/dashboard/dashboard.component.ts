import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@serviceAdmin/auth.service";

@Component({
    selector : 'dashboard',
    templateUrl : './dashboard.component.html'
})
export class DashboardComponent implements OnInit{

    fullName! : string

    constructor(
        private router : Router,
        private authService: AuthService){}

    ngOnInit(): void {
       this.getProfile()
    }

    getProfile(){
        const profile = this.authService.getProfile()
        if(profile){
            this.fullName = profile.userName
        }
    }
}