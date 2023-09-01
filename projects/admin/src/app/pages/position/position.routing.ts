import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PositionComponent } from "./list/position.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { ButtonComponent } from "@component/button/button.component";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { DialogModule } from "primeng/dialog";
import { FileUploadModule } from "primeng/fileupload";
import { SharedModuleComponent } from "@shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: PositionComponent
    }
]

@NgModule({
    declarations:[
        PositionComponent
    ],
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        ButtonComponent,
        DropdownModule,
        InputTextModule,
        DialogModule,
        FileUploadModule,
        SharedModuleComponent
    ], 
    exports:[
        RouterModule
    ]
})
export class PositionRouting{

}