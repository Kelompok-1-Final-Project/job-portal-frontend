import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HiredGetResDto } from '@dto/hired/hired.get.res.dto';
import { AuthService } from '@serviceAdmin/auth.service';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'hired-list',
  templateUrl: './hired-list.component.html',
  styleUrls: ['./hired-list.component.css']
})
export class HiredListComponent implements OnInit {

  visibleUpdateStatus: boolean = false;
  hired!: HiredGetResDto[]
  userId!: string
  search: string = ''

  constructor(
    private title: Title,
    private statusProgressService: StatusProgressService,
    private authService: AuthService
  ) {
    this.title.setTitle('Hired | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getProfile()
    this.getHired()
  }

  getHired() {
    firstValueFrom(this.statusProgressService.getHired(this.userId)).then(result => {
      this.hired = result
    })
  }

  getProfile() {
    const profile = this.authService.getProfile()
    if (profile) {
      this.userId = profile.userId
    }
  }
}