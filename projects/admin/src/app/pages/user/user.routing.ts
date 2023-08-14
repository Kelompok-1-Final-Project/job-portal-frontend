import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "@component/button/button.component";
import { SharedModuleComponent } from "@shared/shared.module";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { UserListComponent } from "./list/user-list.component";
import { UserUpdateComponent } from "./update/user-update.component";
import { UserInsertComponent } from "./insert/user-insert.component";

const routes : Routes = [
    {
        path : '',
        component : UserListComponent
    },
    {
        path : 'detail/:id',
        component : UserUpdateComponent
    },
    {
        path : 'create',
        component : UserInsertComponent
    }
]

@NgModule({
    declarations : [
        UserInsertComponent,
        UserUpdateComponent,
        UserListComponent
    ],
    imports :[
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        AutoCompleteModule,
        PanelModule,
        TableModule,
        SharedModuleComponent

    ],
    exports :[
        UserInsertComponent,
        RouterModule
    ]
})
export class UserRouting{

}