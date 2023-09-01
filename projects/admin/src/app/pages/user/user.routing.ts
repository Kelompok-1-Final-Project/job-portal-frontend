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
import { UserProfilesComponent } from "./profiles/user-profiles.component";
import { UpdateProfilesComponent } from "./update-profiles/update-profiles.component";
import { PasswordModule } from "primeng/password";
import { UserChangePasswordComponent } from "./changePassword/change-password.component";

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
    },
    {
        path: 'profiles',
        component: UserProfilesComponent
    },
    {
        path: 'profiles/update/:id',
        component: UpdateProfilesComponent
    },
    {   
        path: 'change-password',
        component: UserChangePasswordComponent
    }
]

@NgModule({
    declarations : [
        UserInsertComponent,
        UserUpdateComponent,
        UserListComponent,
        UserDetailComponent,
        UserProfilesComponent,
        UpdateProfilesComponent,
        UserChangePasswordComponent
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
        TagModule,
        PasswordModule
    ],
    exports :[
        UserInsertComponent,
        RouterModule
    ]
})
export class UserRouting{

}