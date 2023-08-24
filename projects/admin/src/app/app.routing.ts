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
import { SharedModuleComponent } from "@shared/shared.module";
import { BaseComponent } from "@component/base/base.component";
import { UrlPipeAdmin } from "@pipes/url.pipe";

const routes: Routes = [
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
        component: BaseComponent,
        path: 'companies',
        loadChildren: () => import('./pages/company/company.module')
            .then(c => c.CompanyModule)
    }, {
        component: BaseComponent,
        path: 'cities',
        loadChildren: () => import('./pages/city/city.module')
            .then(c => c.CityModule)
    }, {
        component: BaseComponent,
        path: 'candidates',
        loadChildren: () => import('./pages/candidate/candidate.module')
            .then(c => c.CandidateModule)
    }, {
        component: BaseComponent,
        path: 'users',
        loadChildren: () => import('./pages/user/user.module')
            .then(c => c.UserModule)
    }, {
        component: BaseComponent,
        path: 'benefits',
        loadChildren: () => import('./pages/benefit/benefit.module')
            .then(c => c.BenefitModule)
    },
    {
        component: BaseComponent,
        path: 'industries',
        loadChildren: () => import('./pages/industry/industry.module')
            .then(c => c.IndustryModule)
    },
    {
        component: BaseComponent,
        path: 'skills',
        loadChildren: () => import('./pages/skill/skill.module')
            .then(c => c.SkillModule)
    },
    {
        component: BaseComponent,
        path: 'job-vacancies',
        loadChildren: () => import('./pages/job-vacancy/job.module')
            .then(c => c.JobModule)
    },
    {
        component: BaseComponent,
        path: 'candidate-statuses',
        loadChildren: () => import('./pages/candidate-status/all-candidate/all-candidate.module')
            .then(c => c.AllCandidateModule)
    },
    {
        component: BaseComponent,
        path: 'candidate-statuses/application',
        loadChildren: () => import('./pages/candidate-status/application/application.module')
            .then(c => c.ApplicationModule)
    },
    {
        component: BaseComponent,
        path: 'candidate-statuses/assessment',
        loadChildren: () => import('./pages/candidate-status/assesment/assesment.module')
            .then(c => c.AssesmentModule)
    },
    {
        component: BaseComponent,
        path: 'candidate-statuses/mcu',
        loadChildren: () => import('./pages/candidate-status/medical-checkup/mcu.module')
            .then(c => c.McuModule)
    },
    {
        component: BaseComponent,
        path: 'candidate-statuses/interview',
        loadChildren: () => import('./pages/candidate-status/interview/interview.module')
            .then(c => c.InterviewModule)
    },
    {
        component: BaseComponent,
        path: 'candidate-statuses/hired',
        loadChildren: () => import('./pages/candidate-status/hired/hired.module')
            .then(c => c.HiredModule)
    },
    {
        component: BaseComponent,
        path: 'candidate-statuses/offering',
        loadChildren: () => import('./pages/candidate-status/offering/offering.module')
            .then(c => c.OfferingModule)
    },
    {
        component: BaseComponent,
        path: 'questions',
        loadChildren: () => import('./pages/skill-test/question/question.module')
            .then(c => c.QuestionModule)
    },
    {
        component: BaseComponent,
        path: 'skill-test',
        loadChildren: () => import('./pages/skill-test/test/test.module')
            .then(c => c.TestModule)
    },
    {
        component: BaseComponent,
        path: 'blacklist',
        loadChildren: () => import('./pages/blacklist/blacklist.module')
            .then(c => c.BlacklistModule)
    },
    {
        component: BaseComponent,
        path: 'employees',
        loadChildren: () => import('./pages/employee/employee.module')
            .then(c => c.EmployeeModule)
    },
    {
        component: LoginComponent,
        path: 'login',
        // canMatch : [ authValidation ]
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        component: NotFoundComponent,
        path: '**'
    }
]

@NgModule({
    declarations: [
        DashboardComponent,
        LoginComponent,
        NotFoundComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BaseModule,
        FormsModule,
        CommonModule,
        ButtonComponent,
        ReactiveFormsModule,
        SharedModuleComponent,
        UrlPipeAdmin
    ],
    exports: [
        RouterModule,
        DashboardComponent,
        LoginComponent
    ]
})

export class AppRouting {

}