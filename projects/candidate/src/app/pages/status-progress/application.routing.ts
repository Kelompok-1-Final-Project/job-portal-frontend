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
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ApplicationComponent } from "./list/list-app.component";
import { TabViewModule } from 'primeng/tabview'; 
import { TabMenuModule } from 'primeng/tabmenu';
import { ChipModule } from "primeng/chip";
import { UrlPipeAdmin, UrlPipeCandidate } from "@pipes/url.pipe";
import { PaginatorModule } from "primeng/paginator";
import { ScrollTopModule } from "primeng/scrolltop";
import { TimeAgoPipe } from "@pipes/time-ago.pipe";


const routes : Routes = [
    {
        path : '',
        component : ApplicationComponent
    }
];

@NgModule({
    declarations : [
        ApplicationComponent,
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
        CarouselModule,
        CardModule,
        ImageModule,
        TreeModule,
        AccordionModule,
        CheckboxModule,
        InputNumberModule,
        ContextMenuModule,
        TabViewModule,
        TabMenuModule,
        ChipModule,
        UrlPipeAdmin,
        UrlPipeCandidate,
        PaginatorModule,
        ScrollTopModule,
        TimeAgoPipe,
        FileUploadModule
    ],
    exports : [
        RouterModule
    ]
 } )

export class ApplicationRouting {

}