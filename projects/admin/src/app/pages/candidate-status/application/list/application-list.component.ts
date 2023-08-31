import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApplicationGetResDto } from '@dto/application/application.get.res.dto';
import { AuthService } from '@serviceAdmin/auth.service';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'application-list',
  templateUrl: './application-list.component.html'
})
export class ApplicationListComponent implements OnInit {

  visibleUpdateStatus: boolean = false;
  application!: ApplicationGetResDto[]
  userId!: string
  search: string = ''

  constructor(
    private title: Title,
    private statusProgressService: StatusProgressService,
    private authService: AuthService
  ) {
    this.title.setTitle('Application | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getUserId()
    this.getApplication()
  }

  getApplication() {
    firstValueFrom(this.statusProgressService.getApplication(this.userId)).then(result => {
      this.application = result
    })
  }

  getUserId(){
    const profile = this.authService.getProfile()
    if(profile){
      this.userId = profile.userId
    }
  }

}