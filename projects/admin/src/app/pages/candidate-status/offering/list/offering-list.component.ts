import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OfferingGetResDto } from '@dto/offering/offering.get.res.dto';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';

@Component({
  selector: 'offering-list',
  templateUrl: './offering-list.component.html'
})
export class OfferingListComponent implements OnInit {

  visibleUpdateStatus: boolean = false;
  offering!: OfferingGetResDto[]

  constructor(
    private statusProgressService: StatusProgressService,
    private title: Title
  ) {
    this.title.setTitle('Offering | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getOffering()
  }

  getOffering() {
    this.statusProgressService.getOffering().subscribe(result => {
      this.offering = result
    })
  }
}