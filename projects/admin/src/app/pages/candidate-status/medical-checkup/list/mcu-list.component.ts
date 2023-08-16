import {
  Component,
  OnInit
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MedicalCheckupGetResDto } from '@dto/medicalcheckup/medical-checkup.get.res.dto';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';

@Component({
  selector: 'mcu-list',
  templateUrl: './mcu-list.component.html'
})
export class McuListComponent implements OnInit {

  visibleUpdateStatus:boolean=false;
  mcus!: MedicalCheckupGetResDto[]
  
  constructor(
    private title : Title,
    private statusProgressService: StatusProgressService
  ){
    this.title.setTitle('Medical Checkup | Job Portal Admin')
  }
  
  ngOnInit(): void {
    this.getMedicalCheckup()
  }

  getMedicalCheckup(){
    this.statusProgressService.getMedicalCheckup().subscribe(result => {
      this.mcus = result
    })
  }

}