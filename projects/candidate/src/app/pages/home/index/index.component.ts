import { Component, OnInit } from '@angular/core';


@Component({
    selector : 'home-index',
    templateUrl : './index.component.html'
})
export class HomeComponent implements OnInit{
  
    constructor(){}
    carouselImages = [
        'https://www.istockphoto.com/id/foto/lanskap-gunung-gm517188688-89380423?phrase=alam%20dan%20lanskap',
        'url-to-image-2',
        'url-to-image-3'
      ];
    
      companyIndustries = [
        'Technology',
        'Finance',
        'Healthcare',
        'Education',
        'Healthcare',
        'Education',
        'Technology',
        'Finance',
      ];
    ngOnInit(): void {
    }

  }