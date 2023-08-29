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
import { TagModule } from 'primeng/tag';
import { UserDetailComponent } from "./detail/user-detail.component";

const routes : Routes = [
    {
        path : '',
        component : UserListComponent
    },
    {
        path : 'update/:id',
        component : UserUpdateComponent
    },
    {
        path : 'create',
        component : UserInsertComponent
    },
    {
        path: 'detail/:id',
        component: UserDetailComponent
    }
]

@NgModule({
    declarations : [
        UserInsertComponent,
        UserUpdateComponent,
        UserListComponent,
        UserDetailComponent
    ],
    imports :[
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonComponent,
        AutoCompleteModule,
        PanelModule,
        TableModule,
        SharedModuleComponent,
        TagModule
    ],
    exports :[
        UserInsertComponent,
        RouterModule
    ]
})
export class UserRouting{

}