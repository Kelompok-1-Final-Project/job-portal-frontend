import { Component } from "@angular/core";

@Component({
  selector: 'blacklist',
  templateUrl: './blacklist.component.html'
})
export class BlacklistComponent {

  blacklist = [{
    candidateName: 'Anggi Wirahmat',
    companyName: 'Lawencon',
  },
  {
    candidateName: 'M Firman',
    companyName: 'Linov',
  },
  {
    candidateName: 'Torangto Situngkir',
    companyName: 'Pakuwon',
  },
  ]
}