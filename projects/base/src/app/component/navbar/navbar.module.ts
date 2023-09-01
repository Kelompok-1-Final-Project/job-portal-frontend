import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from "primeng/overlaypanel";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';

@NgModule({
    declarations: [
        NavbarComponent
    ], imports: [
        RouterModule,
        CommonModule,
        MenubarModule,
        OverlayPanelModule,
        AvatarModule,
        MenuModule
    ],
    exports: [
        AvatarModule,
        AvatarGroupModule,
        MenuModule,
        NavbarComponent
    ]
})

export class NavbarModule {

}