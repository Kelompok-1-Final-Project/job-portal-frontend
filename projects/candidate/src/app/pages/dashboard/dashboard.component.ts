import { Component, OnInit } from "@angular/core";
import { RoleCode } from "@constant/role.enum";
import { Router } from "@angular/router";

@Component({
    selector : 'dashboard',
    templateUrl : './dashboard.component.html'
})
export class DashboardComponent implements OnInit{

    fullName! : string

    constructor(
        private router : Router){}

    ngOnInit(): void {
        // const profile = this.authService.getProfile()
        // if(profile){
        //     this.fullName = profile.userName
        // }
        // if(profile?.roleCode == RoleCode.CANDIDATE){
        //     this.router.navigateByUrl('/test')
        // }
    }
}