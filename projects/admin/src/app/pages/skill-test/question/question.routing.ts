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
import { QuestionListComponent } from "./list/question-list.component";
import { QuestionInsertComponent } from "./insert/question-insert.component";
import { SharedModuleComponent } from "@shared/shared.module";
import { QuestionDetailComponent } from "./detail/question-detail.component";
import { ButtonComponent } from "@component/button/button.component";


const routes : Routes = [
    {
        path : '',
        component : QuestionListComponent
    },
    {
        path : 'detail/:id',
        component : QuestionDetailComponent
    },
    {
        path : 'create',
        component : QuestionInsertComponent
    }
];

@NgModule({
    declarations : [
        QuestionListComponent,
        QuestionInsertComponent,
        QuestionDetailComponent
    ],
    imports : [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        DropdownModule,
        ButtonComponent,
        SharedModuleComponent
    ],
    exports : [
        RouterModule
    ]
 } )

export class QuestionRouting {

}