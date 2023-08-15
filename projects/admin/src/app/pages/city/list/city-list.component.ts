import { Component, OnInit } from '@angular/core';

interface Cities {
  cityCode: string;
  cityName: string;
}

@Component({
    selector : 'city-list',
    templateUrl : './city-list.component.html'
})
export class CityListComponent implements OnInit{

    // visibleUpdate: boolean = false;

    constructor(){}
    cities: Cities[] = [
      {
        cityCode: 'CP001',
        cityName: 'Jakarta',
      },
      {
        cityCode: 'CP002',
        cityName: 'Surabaya',
      },
      {
        cityCode: 'CP003',
        cityName: 'Bandung',
      },
    ];
    ngOnInit(): void {
    }

  }