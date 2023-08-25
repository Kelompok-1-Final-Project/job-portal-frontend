import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CompanyDetailComponent } from "./detail/company-detail.component";
import { CardModule } from 'primeng/card';
import { CompanyListComponent } from "./list/company.component";
import { ImageModule } from 'primeng/image';
import { UrlPipeCandidate } from "@pipes/url.pipe";


const routes : Routes = [
    {
        path : '',
        component : CompanyListComponent
    },
    {
        path : 'detail/:id',
        component : CompanyDetailComponent
    }
];

@NgModule({
    declarations : [
        CompanyDetailComponent,
        CompanyListComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        CardModule,
        ImageModule,
        ReactiveFormsModule,
        UrlPipeCandidate
    ],
    exports : [
        RouterModule
    ]
 } )

export class CompanyRouting {

}