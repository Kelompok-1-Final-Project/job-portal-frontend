import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModuleComponent } from "@shared/shared.module";
import { ReportListComponent } from "./list/report-list.component";
import { ButtonComponent } from "@component/button/button.component";

const routes : Routes = [
    {
        path : '',
        component : ReportListComponent
    }
];

@NgModule({
    declarations : [
        ReportListComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        SharedModuleComponent
    ],
    exports : [
        RouterModule
    ]
 } )

export class ReportRouting {

}