import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SharedModuleComponent } from "@shared/shared.module";

@Component({
    selector : 'app-button',
    template : `
        <p-button icon="{{ iconBtn }}" label="{{ label }}" *ngIf="show" [loading]="loading" type="{{ btnType }}" styleClass="{{ classBtn }}" (click)= "clickBtn()"></p-button>
    `,
    imports : [
        CommonModule,
        SharedModuleComponent
    ],
    standalone : true
})
export class ButtonComponent{
    @Input() label = ''
    @Input() classBtn = ''
    @Input() btnType = ''
    @Input() iconBtn = ''
    @Input() loading = false
    @Input() show = true

    @Output() clickChange = new EventEmitter<void>()

    clickBtn(){
        this.clickChange.emit()
    }
}