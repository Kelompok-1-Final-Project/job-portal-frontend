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
import { IndustryListComponent } from "./list/industry-list.component";
import { SharedModuleComponent } from "@shared/shared.module";
import { ButtonComponent } from "@component/button/button.component";

const routes : Routes = [
    {
        path : '',
        component : IndustryListComponent
    }
];

@NgModule({
    declarations : [
        IndustryListComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonComponent,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        DialogModule,
        FileUploadModule,
        SharedModuleComponent
    ],
    exports : [
        RouterModule
    ]
 } )

export class IndustryRouting {

}