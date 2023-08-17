import {
  Component,
  OnInit
} from '@angular/core';


@Component({
  selector: 'list-app-index',
  templateUrl: './list-app.component.html'
})
export class ApplicationComponent implements OnInit {
  constructor() {}
  options = [{
      name: 'Newest',
      code: 'new'
    },
    {
      name: 'Oldest',
      code: 'old'
    }
  ];

  ngOnInit(): void {}

}