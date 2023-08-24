import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListEmployeeComponent } from "./list/list-employee.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { SharedModuleComponent } from "@shared/shared.module";

const routes: Routes=[
    {   
        path : '',
        component : ListEmployeeComponent
    }
]
@NgModule({
    declarations:[
        ListEmployeeComponent
    ],
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        SharedModuleComponent
    ],
    exports:[
        RouterModule,
        ListEmployeeComponent
    ]
})
export class EmployeeRouting{

}