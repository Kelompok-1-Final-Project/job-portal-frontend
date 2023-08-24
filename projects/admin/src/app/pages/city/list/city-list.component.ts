import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CityGetResDto } from '@dto/city/city.get.res.dto';
import { CompanyGetResDto } from '@dto/company/company.get.res.dto';
import { CityService } from '@serviceAdmin/city.service';
import { firstValueFrom } from 'rxjs';

interface Cities {
  cityCode: string;
  cityName: string;
}

@Component({
  selector: 'city-list',
  templateUrl: './city-list.component.html'
})
export class CityListComponent implements OnInit {

  cities!: CityGetResDto[]

  constructor(
    private title: Title,
    private cityService: CityService
  ) {
    this.title.setTitle('City | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getAllCity()
  }

  getAllCity() {
    firstValueFrom(this.cityService.getAll()).then(result => {
      this.cities = result
    })
  }

}