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
import { BaseComponent } from "@component/base/base.component";

const routes : Routes = [
    {
        path: 'dashboard',
        component: BaseComponent,
        children: [
          {
            path: '',
            component: DashboardComponent,
          },
        ],
    },
    {
        component : BaseComponent,
        path : 'companies',
        loadChildren : () => import ('./pages/company/company.module')
        .then(c => c.CompanyModule)
    },{
        component : BaseComponent,
        path : 'cities',
        loadChildren : () => import ('./pages/city/city.module')
        .then(c => c.CityModule)
    },{
        component : BaseComponent,
        path : 'candidates',
        loadChildren : () => import ('./pages/candidate/candidate.module')
        .then(c => c.CandidateModule)
    },{
        component : BaseComponent,
        path : 'benefits',
        loadChildren : () => import ('./pages/benefit/benefit.module')
        .then(c => c.BenefitModule)
    },
    {
        component : BaseComponent,
        path : 'industries',
        loadChildren : () => import ('./pages/industry/industry.module')
        .then(c => c.IndustryModule)
    },
    {
        component : BaseComponent,
        path : 'skills',
        loadChildren : () => import ('./pages/skill/skill.module')
        .then(c => c.SkillModule)
    },
    {
        component : BaseComponent,
        path : 'job-vacancies',
        loadChildren : () => import ('./pages/job-vacancy/job.module')
        .then(c => c.JobModule)
    },
    {
        component : LoginComponent,
        path : 'login',
        // canMatch : [ authValidation ]
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
        LoginComponent
    ]
})

export class AppRouting{

}