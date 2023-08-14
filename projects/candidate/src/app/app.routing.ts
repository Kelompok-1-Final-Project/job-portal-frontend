import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { NotFoundComponent } from "@component/not-found/not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { authValidation } from "projects/base/src/app/validation/auth.validation";
import { BaseModule } from "@component/base/base.module";
import { ButtonComponent } from "@component/button/button.component";
import { UrlPipe } from "@pipes/url.pipe";
import { SharedModuleComponent } from "@shared/shared.module";
import { RegisterComponent } from "./pages/register/register.component";
import { BaseComponent } from "@component/base/base.component";

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
    },{
        component : BaseComponent,
        path : 'home',
        loadChildren : () => import ('./pages/home/home.module')
        .then(c => c.HomeModule)
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
        NotFoundComponent
    ],
    imports : [
        RouterModule.forRoot(routes),
        BaseModule,
        FormsModule,
        CommonModule,
        ButtonComponent,
        ReactiveFormsModule,
        UrlPipe,
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