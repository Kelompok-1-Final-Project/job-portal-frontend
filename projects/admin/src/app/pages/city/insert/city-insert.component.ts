import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector : 'city-insert',
    templateUrl : './city-insert.component.html'
})
export class CityInsertComponent implements OnInit{

    constructor (
        private fb: NonNullableFormBuilder,
        private router : Router
    ){
        
    }

    ngOnInit(){

    }
    insert() {
       
      }
}