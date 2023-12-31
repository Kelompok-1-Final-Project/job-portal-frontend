import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "@component/button/button.component";
import { SharedModuleComponent } from "@shared/shared.module";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CandidateInsertComponent } from "./insert/candidate-insert.component";
import { CandidateUpdateComponent } from "./update/candidate-update.component";
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { CandidateListComponent } from "./list/candidate-list.component";
import { CandidateDetailComponent } from "./detail/candidate-detail.component";

const routes: Routes = [
    {
        path: '',
        component: CandidateListComponent
    },
    {
        path: 'update/:id',
        component: CandidateUpdateComponent
    },
    {
        path: 'create',
        component: CandidateInsertComponent
    },
    {
        path: 'detail/:id',
        component: CandidateDetailComponent
    }
]

@NgModule({
    declarations: [
        CandidateInsertComponent,
        CandidateUpdateComponent,
        CandidateListComponent,
        CandidateDetailComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        AutoCompleteModule,
        PanelModule,
        TableModule,
        SharedModuleComponent
    ],
    exports: [
        CandidateInsertComponent,
        RouterModule
    ]
})
export class CandidateRouting {

}