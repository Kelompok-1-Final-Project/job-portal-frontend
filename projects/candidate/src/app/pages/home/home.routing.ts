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
import { HomeComponent } from "./index/index.component";
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { VacancyComponent } from "./vacancy/vacancy.component";
import { TreeModule } from 'primeng/tree';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { VacancyDetailComponent } from "./vacancy-detail/vacancy-detail.component";
import { ContextMenuModule } from 'primeng/contextmenu';
import { SaveJobsComponent } from "./save-jobs/save-jobs.component";
import { RadioButtonModule } from 'primeng/radiobutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UrlPipeCandidate } from "@pipes/url.pipe";



const routes : Routes = [
    {
        path : '',
        component : HomeComponent
    },{
        path : 'job',
        component : VacancyComponent
    },{
        path : 'job/industry/:id',
        component : VacancyComponent
    },{
        path : 'save-jobs',
        component : SaveJobsComponent
    },{
        path : 'detail/:id',
        component : VacancyDetailComponent
    }
];

@NgModule({
    declarations : [
        HomeComponent,
        VacancyComponent,
        VacancyDetailComponent,
        SaveJobsComponent
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
        RadioButtonModule,
        AutoCompleteModule,
        UrlPipeCandidate,
        FileUploadModule
    ],
    exports : [
        RouterModule
    ]
 } )

export class HomeRouting {

}