import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { CityService } from "@serviceAdmin/city.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'city-update',
    templateUrl: './city-update.component.html'
})
export class CityUpdateComponent implements OnInit {
    
    code!: string;
    loading: boolean = false

    cityUpdateReqDto = this.fb.group({
        cityCode: ['', [Validators.required]],
        cityName: ['', [Validators.required]]
    })

    constructor(
        private activatedRoute: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router: Router,
        private title: Title,
        private cityService: CityService
    ) {
        this.title.setTitle('Update City | Job Portal Admin')
    }

    ngOnInit(): void {
        // this.init();
        firstValueFrom(this.activatedRoute.params).then(param => {
            this.code = param['id']
            this.cityUpdateReqDto.get('cityCode')?.setValue(this.code)
        })
    }

    updateCity(){
        this.loading = true
        const data = this.cityUpdateReqDto.getRawValue()
        firstValueFrom(this.cityService.update(data)).then(result => {
            this.loading = false
            this.router.navigateByUrl('cities')
        })
    }
}