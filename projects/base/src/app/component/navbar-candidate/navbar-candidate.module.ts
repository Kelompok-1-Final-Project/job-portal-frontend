import { NgModule } from "@angular/core";
import { NavbarCandidateComponent} from "./navbar-candidate.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MenubarModule } from 'primeng/menubar';
import { UrlPipe } from "@pipes/url.pipe";

@NgModule({
    declarations : [
        NavbarCandidateComponent
    ],imports :[
        RouterModule,
        CommonModule,
        MenubarModule,
        UrlPipe
    ], 
    exports : [
        NavbarCandidateComponent
    ]
})

export class NavbarCandidateModule{

}