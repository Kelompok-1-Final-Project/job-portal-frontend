import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenubarModule } from 'primeng/menubar';

@NgModule({
    declarations : [
        NavbarComponent
    ],imports :[
        RouterModule,
        CommonModule,
        MenubarModule
    ], 
    exports : [
        NavbarComponent
    ]
})

export class NavbarModule{

}