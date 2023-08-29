import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector : 'dashboard',
    templateUrl : './dashboard.component.html'
})
export class DashboardComponent implements OnInit{

    fullName! : string

    constructor(
        private router : Router){}

    ngOnInit(): void {
       
    }
}