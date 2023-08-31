import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OfferingGetResDto } from '@dto/offering/offering.get.res.dto';
import { AuthService } from '@serviceAdmin/auth.service';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'offering-list',
  templateUrl: './offering-list.component.html'
})
export class OfferingListComponent implements OnInit {

  visibleUpdateStatus: boolean = false;
  offering!: OfferingGetResDto[]
  userId!: string
  search: string = ''

  constructor(
    private statusProgressService: StatusProgressService,
    private title: Title,
    private authService: AuthService
  ) {
    this.title.setTitle('Offering | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getProfile()
    this.getOffering()
  }

  getOffering() {
    firstValueFrom(this.statusProgressService.getOffering(this.userId)).then(result => {
      this.offering = result
    })
  }

  getProfile(){
    const profile = this.authService.getProfile()
    if(profile){
      this.userId = profile.userId
    }
  }
}