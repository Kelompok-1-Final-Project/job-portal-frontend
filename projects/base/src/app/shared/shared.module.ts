import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
    imports: [
        InputTextModule,
        ButtonModule,
        TableModule,
        PasswordModule,
        InputSwitchModule,
        InputTextareaModule,
        DropdownModule,
        FileUploadModule,
        FormsModule,
        DialogModule,
        RadioButtonModule,
        CalendarModule,
        CheckboxModule,
        PanelModule,
        InputNumberModule
    ],
    exports: [
        InputTextModule,
        ButtonModule,
        TableModule,
        PasswordModule,
        InputSwitchModule,
        InputTextareaModule,
        DropdownModule,
        FileUploadModule,
        FormsModule,
        DialogModule,
        RadioButtonModule,
        CalendarModule,
        CheckboxModule,
        PanelModule,
        InputNumberModule,
        TooltipModule
    ]
})
export class SharedModuleComponent {

}