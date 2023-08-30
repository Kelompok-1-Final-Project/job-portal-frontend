import { NgModule } from "@angular/core";
import { BaseComponent } from "./base.component";
import { RouterModule } from "@angular/router";
import { NavbarModule } from "@component/navbar/navbar.module";
import { FooterModule } from "@component/footer/footer.module";

@NgModule({
    declarations: [
        BaseComponent,
    ],
    imports: [
        NavbarModule,
        RouterModule,
        FooterModule
    ],
    exports: [
        BaseComponent
    ]
})
export class BaseModule {

}