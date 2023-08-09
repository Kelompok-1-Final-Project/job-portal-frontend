import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UrlPipe } from "@pipes/url.pipe";
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        UrlPipe,
        MenubarModule,
        OverlayPanelModule,
        AvatarModule,
        AvatarGroupModule,
        MenuModule
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {

}