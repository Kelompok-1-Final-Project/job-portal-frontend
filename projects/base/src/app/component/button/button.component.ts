import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModuleComponent } from "@shared/shared.module";

@Component({
    selector: 'app-button',
    template: `
        <button pButton icon="{{ iconBtn }}" label="{{ label }}" *ngIf="show" [loading]="loading" type="{{ btnType }}" style="{{ classBtn }}" routerLink="{{link}}" (click)= "clickBtn()"></button>
    `,
    imports: [
        CommonModule,
        SharedModuleComponent,
        RouterModule
    ],
    standalone: true
})
export class ButtonComponent {
    @Input() label = ''
    @Input() classBtn = ''
    @Input() btnType = ''
    @Input() iconBtn = ''
    @Input() loading = false
    @Input() show = true
    @Input() link: string | undefined = undefined

    @Output() clickChange = new EventEmitter<void>()

    clickBtn() {
        this.clickChange.emit()
    }
}