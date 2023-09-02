import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { CityService } from "@serviceAdmin/city.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'city-insert',
    templateUrl: './city-insert.component.html'
})
export class CityInsertComponent implements OnInit {

    loading: boolean = false

    cityInsertReqDto = this.fb.group({
        cityName: ['', [Validators.required]]
    })

    constructor(
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cityService: CityService
    ) {
        this.title.setTitle('Insert City | Job Portal Admin')
    }

    ngOnInit() {

    }

    insertCity() {
        this.loading = true
        const data = this.cityInsertReqDto.getRawValue()
        firstValueFrom(this.cityService.insert(data)).then(result => {
            this.loading = false
            this.router.navigateByUrl('/cities')
        })
    }
}