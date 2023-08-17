import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HiredGetResDto } from '@dto/hired/hired.get.res.dto';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';

@Component({
  selector: 'hired-list',
  templateUrl: './hired-list.component.html'
})
export class HiredListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  hired!: HiredGetResDto[]
  
  constructor(
    private title: Title,
    private statusProgressService: StatusProgressService
  ){
    this.title.setTitle('Hired | Job Portal Admin')
  }
  
  ngOnInit(): void {
    this.getHired()
  }

  getHired(){
    this.statusProgressService.getHired().subscribe(result => {
      this.hired = result
    })
  }
}