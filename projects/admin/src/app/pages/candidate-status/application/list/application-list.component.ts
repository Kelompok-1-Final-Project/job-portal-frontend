import {Component,OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApplicationGetResDto } from '@dto/application/application.get.res.dto';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';

@Component({
  selector: 'application-list',
  templateUrl: './application-list.component.html'
})
export class ApplicationListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  application!: ApplicationGetResDto[]

  constructor(
    private title: Title,
    private statusProgressService: StatusProgressService
  ){
    this.title.setTitle('Application | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getApplication()
  }

  getApplication(){
    this.statusProgressService.getApplication().subscribe(result => {
      this.application = result
    })
  }

}