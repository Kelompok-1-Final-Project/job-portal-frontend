import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NotFoundComponent } from "@component/not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { authValidation, authValidationTest } from "projects/base/src/app/validation/auth.validation";
import { BaseModule } from "@component/base/base.module";
import { ButtonComponent } from "@component/button/button.component";
import { UrlPipeCandidate } from "@pipes/url.pipe";
import { SharedModuleComponent } from "@shared/shared.module";
import { RegisterComponent } from "./pages/register/register.component";
import { CardModule } from 'primeng/card';
import { BaseComponent } from "@component/base/base.component";
import { TestComponent } from "./pages/test/test.component";

const routes : Routes = [
    {
        component : LoginComponent,
        path : 'login',
        // canMatch : [ authValidation ]
    },
    {
        component : RegisterComponent,
        path : 'register',
        // canMatch : [ authValidation ]
    },
    {
        component : TestComponent,
        path : 'tests/:jobId',
        // canMatch : [ authValidationTest ]
    },{
        component : BaseComponent,
        path : 'home',
        loadChildren : () => import ('./pages/home/home.module')
        .then(c => c.HomeModule)
    },{
        component : BaseComponent,
        path : 'profile',
        loadChildren : () => import ('./pages/profile/profile.module')
        .then(c => c.ProfileModule)
    },
    {
        component : BaseComponent,
        path : 'status-progress',
        loadChildren : () => import ('./pages/status-progress/application.module')
        .then(c => c.ApplicationModule)
    },
    {
        component : BaseComponent,
        path : 'companies',
        loadChildren : () => import ('./pages/company/company.module')
        .then(c => c.CompanyModule)
    },
    {
        path : '',
        redirectTo : '/login',
        pathMatch : 'full'
    },
    {
        component : NotFoundComponent,
        path : '**'
    }
]

@NgModule({
    declarations : [
        DashboardComponent,
        LoginComponent,
        RegisterComponent,
        TestComponent,
        NotFoundComponent
    ],
    imports : [
        RouterModule.forRoot(routes),
        BaseModule,
        FormsModule,
        CommonModule,
        ButtonComponent,
        ReactiveFormsModule,
        UrlPipeCandidate,
        CardModule,
        SharedModuleComponent
    ],
    exports : [
        RouterModule,
        DashboardComponent,
        LoginComponent,
        RegisterComponent
    ]
})

export class AppRouting{

}