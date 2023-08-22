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
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProfileDetailComponent } from "./detail/profile-detail.component";
import { ContextMenuModule } from 'primeng/contextmenu';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from "primeng/chip";
import {CalendarModule} from 'primeng/calendar';
import {OverlayPanelModule} from 'primeng/overlaypanel';




const routes : Routes = [
    {
        path : '',
        component : ProfileDetailComponent
    }
];

@NgModule({
    declarations : [
        ProfileDetailComponent,
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
        CardModule,
        ImageModule,
        TreeModule,
        AccordionModule,
        CheckboxModule,
        InputNumberModule,
        ContextMenuModule,
        AvatarModule,
        ChipModule,
        CalendarModule,
        OverlayPanelModule,
        FileUploadModule
    ],
    exports : [
        RouterModule
    ]
 } )

export class ProfileRouting {

}