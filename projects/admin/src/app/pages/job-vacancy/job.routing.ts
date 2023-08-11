import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "@component/button/button.component";
import { SharedModuleComponent } from "@shared/shared.module";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { JobInsertComponent } from "./insert/job-insert.component";
import {EditorModule} from 'primeng/editor';

const routes : Routes = [
    // {
    //     path : '',
    //     component : CompanyListComponent
    // },
    // {
    //     path : 'detail/:id',
    //     component : CompanyUpdateComponent
    // },
    {
        path : 'create',
        component : JobInsertComponent
    }
]

@NgModule({
    declarations : [
        JobInsertComponent,
    ],
    imports :[
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        AutoCompleteModule,
        EditorModule,
        SharedModuleComponent

    ],
    exports :[
        RouterModule
    ]
})
export class JobRouting{

}