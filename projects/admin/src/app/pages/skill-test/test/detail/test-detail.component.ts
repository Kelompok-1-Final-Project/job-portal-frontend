import { Component } from "@angular/core";

@Component({
    selector: 'test-details',
    templateUrl: './test-detail.component.html'
})
export class TestDetailComponent{

    result = [{
        candidateName: 'Anggi Wirahmat',
        grade: '100',
      },
      {
        candidateName: 'M Firman',
        grade: '90',
      },
      {
        candidateName: 'Torangto Situngkir',
        grade: '95',
      },
      ]
}