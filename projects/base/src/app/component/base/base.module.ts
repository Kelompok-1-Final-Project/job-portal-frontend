import { NgModule } from "@angular/core";
import { BaseComponent } from "./base.component";
import { RouterModule } from "@angular/router";
import { NavbarModule } from "@component/navbar/navbar.module";

@NgModule({
    declarations: [
        BaseComponent,
    ],
    imports: [
        NavbarModule,
        RouterModule
    ],
    exports: [
        BaseComponent
    ]
})
export class BaseModule {

}