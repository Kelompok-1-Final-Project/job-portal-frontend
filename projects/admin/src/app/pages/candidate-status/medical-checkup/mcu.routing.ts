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
import { McuListComponent } from "./list/mcu-list.component";
import { SharedModuleComponent } from "@shared/shared.module";
import { ButtonComponent } from "@component/button/button.component";

const routes : Routes = [
    {
        path : '',
        component : McuListComponent,
    }
];

@NgModule({
    declarations : [
        McuListComponent
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
        ButtonComponent,
        FileUploadModule,
        SharedModuleComponent
    ],
    exports : [
        RouterModule
    ]
 } )

export class McuRouting {

}