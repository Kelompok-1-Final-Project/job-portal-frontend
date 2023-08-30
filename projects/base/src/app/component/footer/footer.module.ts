import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenubarModule } from 'primeng/menubar';
import { FooterComponent } from "./footer.component";

@NgModule({
    declarations : [
        FooterComponent
    ],imports :[
        RouterModule,
        CommonModule,
        MenubarModule
    ], 
    exports : [
        FooterComponent
    ]
})

export class FooterModule{

}