import {
  CommonModule
} from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import {
  RouterModule
} from "@angular/router";
import {
  SharedModuleComponent
} from "@shared/shared.module";

@Component({
  selector: 'app-button',
  template: `
        <button pButton pRipple icon="{{ iconBtn }}" label="{{ label }}" *ngIf="show" 
        [loading]="loading" type="{{ btnType }}" style="{{ styleBtn }}" class="{{ classBtn }}" 
        pTooltip="{{tooltipBtn}}" tooltipPosition="{{tooltipPstn}}" [disabled]="disabled" (click)= "clickBtn()"></button>
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
    @Input() styleBtn = ''
    @Input() classBtn = ''
    @Input() btnType = ''
    @Input() iconBtn = ''
    @Input() tooltipBtn = ''
    @Input() tooltipPstn = ''
    @Input() loading = false
    @Input() disabled = false
    @Input() show = true

  @Output() clickChange = new EventEmitter < void > ()

  clickBtn() {
    this.clickChange.emit()
  }
}