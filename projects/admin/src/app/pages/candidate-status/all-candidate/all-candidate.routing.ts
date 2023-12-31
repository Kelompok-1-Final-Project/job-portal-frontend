import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { AllCandidateListComponent } from "./list/all-canndidate-list.component";
import { ButtonComponent } from "@component/button/button.component";
import { SharedModuleComponent } from "@shared/shared.module";

const routes : Routes = [
    {
        path : '',
        component : AllCandidateListComponent,
    }
];

@NgModule({
    declarations : [
        AllCandidateListComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        DialogModule,
        FileUploadModule,
        ButtonComponent,
        SharedModuleComponent
    ],
    exports : [
        RouterModule
    ]
 } )

export class AllCandidateRouting {

}