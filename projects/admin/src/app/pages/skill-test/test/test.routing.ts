import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { BenefitListComponent } from "./list/benefit-list.component";
import { DialogModule } from 'primeng/dialog';

const routes : Routes = [
    {
        path : '',
        component : BenefitListComponent
    }
];

@NgModule({
    declarations : [
        BenefitListComponent
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
        FileUploadModule
    ],
    exports : [
        RouterModule
    ]
 } )

export class BenefitRouting {

}