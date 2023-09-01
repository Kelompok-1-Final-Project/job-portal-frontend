import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MedicalCheckupGetResDto } from '@dto/medicalcheckup/medical-checkup.get.res.dto';
import { AuthService } from '@serviceAdmin/auth.service';
import { StatusProgressService } from '@serviceAdmin/statusprogress.service';
import { FileUpload } from 'primeng/fileupload';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'mcu-list',
  templateUrl: './mcu-list.component.html'
})
export class McuListComponent implements OnInit {

  visibleUpdateStatus: boolean = false;
  mcus!: MedicalCheckupGetResDto[]
  visibleMcu: boolean = false
  userId!: string
  search: string = ''

  medicalUpdateReqDto = this.fb.group({
    medicalId: ['', [Validators.required]],
    file: ['', [Validators.required]],
    ext: ['', [Validators.required]]
  })

  constructor(
    private title: Title,
    private statusProgressService: StatusProgressService,
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {
    this.title.setTitle('Medical Checkup | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getProfile()
    this.getMedicalCheckup()
  }

  getMedicalCheckup() {
    firstValueFrom(this.statusProgressService.getMedicalCheckup(this.userId)).then(result => {
      this.mcus = result
    })
  }

  addFile(id: string) {
    this.visibleMcu = true
    this.medicalUpdateReqDto.get('medicalId')?.setValue(id)
  }

  updateMcu() {
    const data = this.medicalUpdateReqDto.getRawValue()
    firstValueFrom(this.statusProgressService.updateMcuFile(data)).then(result => {
      this.visibleMcu = false
      this.getMedicalCheckup()
    })
  }

  getProfile() {
    const profile = this.authService.getProfile()
    if (profile) {
      this.userId = profile.userId
    }
  }

  isFile(file: string): any {
    if (file != null) {
      return true
    } else {
      return false
    }
  }

  fileUpload(event: any, fileUpload: FileUpload) {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)

        this.medicalUpdateReqDto.patchValue({
          file: resultBase64,
          ext: resultExtension
        })
        fileUpload.clear();

      })
    }
  }

}