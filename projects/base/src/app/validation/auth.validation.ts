import { inject } from "@angular/core";
import { Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "@service/auth.service";
import { RoleCode } from "@constant/role.enum";

export const authValidation = (route: Route, segments: UrlSegment[]) => {
    const auth = inject(AuthService)
    const router = inject(Router)
    const profile = auth.getProfile()

    if (profile) {
        if (profile.roleCode != RoleCode.CANDIDATE){
            router.navigateByUrl('/dashboard')
        }
        else{
            router.navigateByUrl('/test')
        }
    } 
    return true
}

export const authValidationNonLogin = (route: Route, segments: UrlSegment[]) => {
    const auth = inject(AuthService)
    const router = inject(Router)
    const profile = auth.getProfile()

    if (!profile) {
        router.navigateByUrl('/login')
    } 
    
    return true
}