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
import { JobDetailComponent } from "./detail/job-detail.component";
import { TabViewModule } from 'primeng/tabview';

const routes: Routes = [
    {
        path: '',
        component: JobListComponent
    },
    {
        path: 'update/:id',
        component: JobUpdateComponent
    },
    {
        path: 'create',
        component: JobInsertComponent
    },
    {
        path: 'details/:id',
        component: JobDetailComponent
    }
]

@NgModule({
    declarations: [
        JobInsertComponent,
        JobListComponent,
        JobUpdateComponent,
        JobDetailComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        AutoCompleteModule,
        EditorModule,
        SharedModuleComponent,
        TabViewModule
    ],
    exports: [
        RouterModule
    ]
})
export class JobRouting {

}