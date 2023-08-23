import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { CityService } from "@serviceAdmin/city.service";

@Component({
    selector: 'city-update',
    templateUrl: './city-update.component.html'
})
export class CityUpdateComponent implements OnInit {
    
    code!: string;

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

    // init() {
    //     this.activatedRoute.params.subscribe(id => {
    //         this.idParam = Number(Object.values(id));
    //     })
    // }

    ngOnInit(): void {
        // this.init();
        this.activatedRoute.params.subscribe(param => {
            this.code = param['id']
            this.cityUpdateReqDto.get('cityCode')?.setValue(this.code)
        })
    }

    updateCity(){
        const data = this.cityUpdateReqDto.getRawValue()
        this.cityService.update(data).subscribe(result => {
            this.router.navigateByUrl('cities')
        })
    }
}