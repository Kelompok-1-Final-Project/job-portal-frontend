import { inject } from "@angular/core";
import { Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "@serviceCandidate/auth.service";
import { MessageService } from "primeng/api";

export const authValidation = (route: Route, segments: UrlSegment[]) => {
    const auth = inject(AuthService)
    const router = inject(Router)
    const profile = auth.getProfile()

    if (profile) {
        router.navigateByUrl('/home')
    }
    return true;
}

export const authValidationNonLogin = (route: Route, segments: UrlSegment[]) => {
    const auth = inject (AuthService);
    const messageService = inject (MessageService);
    const profile = auth.getProfile();
    const router = inject(Router);

    if (!profile) {
        messageService.add({ severity: 'warn', summary: 'Warn', detail: 'You must log in to access this page' });
        router.navigateByUrl('/login')
    } 
    return true
}


export const authValidationTest = (route: Route, segments: UrlSegment[]) => {
    const auth = inject(AuthService)
    const router = inject(Router)
    const test = auth.getTest()
    const profile = auth.getProfile()
    
    const result = {
        isTestPage : true
    }

    if (test) {
        if(!profile){
            localStorage.setItem('', JSON.stringify(result))
            router.navigateByUrl('/login')
        }
    } 
    else{
        localStorage.setItem('testPage', JSON.stringify(result))
        router.navigateByUrl('/login')
    }
    return true
}