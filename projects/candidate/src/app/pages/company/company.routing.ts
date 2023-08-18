import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CompanyDetailComponent } from "./detail/company-detail.component";


const routes : Routes = [
    {
        path : ':id',
        component : CompanyDetailComponent
    }
];

@NgModule({
    declarations : [
        CompanyDetailComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
    ],
    exports : [
        RouterModule
    ]
 } )

export class CompanyRouting {

}