import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BlacklistComponent } from "./list/blacklist.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

const routes: Routes = [
    {
        path: '',
        component : BlacklistComponent
    }
]

@NgModule({
    declarations:[
        BlacklistComponent
    ],
    imports:[
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        ButtonModule
    ],
    exports:[
        RouterModule
    ]
})
export class BlacklistRouting{

}