import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "@component/button/button.component";
import { CompanyInsertComponent } from "./insert/company-insert.component";
import { SharedModuleComponent } from "@shared/shared.module";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CompanyUpdateComponent } from "./update/company-update.component";
import { CompanyListComponent } from "./list/company-list.component";

const routes : Routes = [
    {
        path : '',
        component : CompanyListComponent
    },
    {
        path : 'detail/:id',
        component : CompanyUpdateComponent
    },
    {
        path : 'create',
        component : CompanyInsertComponent
    }
]

@NgModule({
    declarations : [
        CompanyInsertComponent,
        CompanyUpdateComponent,
        CompanyListComponent
    ],
    imports :[
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        AutoCompleteModule,
        SharedModuleComponent

    ],
    exports :[
        CompanyInsertComponent,
        RouterModule
    ]
})
export class CompanyRouting{

}