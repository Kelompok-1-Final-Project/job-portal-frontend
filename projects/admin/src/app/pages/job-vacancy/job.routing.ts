import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "@component/button/button.component";
import { SharedModuleComponent } from "@shared/shared.module";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { JobInsertComponent } from "./insert/job-insert.component";
import { EditorModule } from 'primeng/editor';
import { JobListComponent } from "./list/job-list.component";
import { JobUpdateComponent } from "./update/job-update.component";

const routes: Routes = [
    {
        path: '',
        component: JobListComponent
    },
    {
        path: 'detail/:code',
        component: JobUpdateComponent
    },
    {
        path: 'create',
        component: JobInsertComponent
    }
]

@NgModule({
    declarations: [
        JobInsertComponent,
        JobListComponent,
        JobUpdateComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        AutoCompleteModule,
        EditorModule,
        SharedModuleComponent
    ],
    exports: [
        RouterModule
    ]
})
export class JobRouting {

}