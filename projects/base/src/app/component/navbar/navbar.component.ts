import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RoleCode } from "@constant/role.enum";
import { AuthService } from "@service/auth.service";
import { MenuItem, PrimeNGConfig } from "primeng/api";
import { OverlayPanel } from "primeng/overlaypanel";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    items!: MenuItem[]
    profileMenu! : MenuItem[]
    imgUrl!: number
    private roleCode!: string

    op! : OverlayPanel

    constructor(private auth: AuthService,
        private primengConfig: PrimeNGConfig,
        private router: Router) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        const profile = this.auth.getProfile()
        if (profile) {
            this.imgUrl = profile.photoId
            this.roleCode = profile.roleCode
        }
        this.items = [
            {
                label : 'Bootcamp Test',
                routerLink : '/dashboard'
            },
            {
                label: 'Home',
                routerLink : '/dashboard'
            },
            {
                label: 'Master',
                items: [
                    {
                        label: 'User',
                        routerLink : '/users',
                        visible : this.isAdmin || this.isHR  
                    },
                    {
                        label: 'Package',
                        routerLink : '/packages',
                        visible : this.isHR 
                    },
                    {
                        label: 'Topic',
                        routerLink : '/topics',
                        visible : this.isReviewer
                    },
                    {
                        label: 'Question',
                        routerLink : '/questions',
                        visible : this.isReviewer
                    }
                ]
            },
            {
                label : 'Review Score',
                routerLink : '/review',
                visible : this.isReviewer
            },
            {
                label : 'Assign Candidate',
                routerLink : '/assigns',
                visible : this.isHR
            }      
        ]
        this.profileMenu = [
            {
                label: 'Account',
                items: [
                    {
                        label: 'Profile',
                        routerLink : '/users/profile',
                        command : () => this.hideOP(this.op)
                    },
                    {
                        label: 'Change Password',
                        routerLink : '/users/change-password',
                        command : () => this.hideOP(this.op)

                    },
                    {
                        label: 'Logout',
                        command : () => this.logout()
                    }
                ]
            },
        ]
    }

    get isAdmin(): boolean {
        return this.roleCode == RoleCode.SUPERADMIN
    }

    get isHR(): boolean {
        return this.roleCode == RoleCode.HR
    }

    get isReviewer(): boolean {
        return this.roleCode == RoleCode.REVIEWER
    }

    getOP(op : OverlayPanel){
        this.op = op
    }

    hideOP(op : OverlayPanel){
        op.hide();
    }

    logout() {
        localStorage.clear()
        this.router.navigateByUrl('/login')
    }

}