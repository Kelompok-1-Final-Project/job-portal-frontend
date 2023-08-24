import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CityUpdateComponent } from "./update/city-update.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CityListComponent } from "./list/city-list.component";
import { CityInsertComponent } from "./insert/city-insert.component";
import { DialogModule } from "primeng/dialog";
import { SharedModuleComponent } from "@shared/shared.module";

const routes : Routes = [
    {
        path : '',
        component : CityListComponent
    }
    ,{
        path : 'new',
        component : CityInsertComponent
    },{
        path : 'update/:id',
        component : CityUpdateComponent
    }
];

@NgModule({
    declarations : [
        CityInsertComponent,
        CityListComponent,
        CityUpdateComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        FileUploadModule,
        DialogModule,
        SharedModuleComponent
    ],
    exports : [
        RouterModule
    ]
 } )

export class CityRouting {

}