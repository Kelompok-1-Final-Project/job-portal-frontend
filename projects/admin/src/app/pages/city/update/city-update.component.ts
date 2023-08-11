import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector : 'city-update',
    templateUrl : './city-update.component.html'
})
export class CityUpdateComponent{
    idParam! : number;
    constructor (
        private activatedRoute : ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router : Router
    ){}

    init(){
        this.activatedRoute.params.subscribe(id => {
            this.idParam = Number(Object.values(id));
        })
    }

    submit(): void {
    }

    ngOnInit():void{
        this.init();
    }
}