import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
    selector : 'register.component.html',
    templateUrl : './register.component.html'
})
export class RegisterComponent{
    loading = false ;
    heading = true;
    userInsertReqDto = this.fb.group({
        userEmail: ['', [Validators.email]],
        userPassword: ['', [Validators.required]],
        roleId: [3, [Validators.required]],
        userName: ['', [Validators.required]],
        userPhone: ['', [Validators.required]],
        userAddress: ['', [Validators.required]],
        ext: [''],
        file: [''],
      })

    constructor (
        private fb : NonNullableFormBuilder,
        private title : Title,
        private router : Router){
            this.title.setTitle('Registration | E-Learning Torangto');
        }

    showHeading() {
        this.heading = !this.heading;
    }
    insert() {
      }
    
      fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result)
          };
          reader.onerror = error => reject(error);
        });
    
        for (let file of event.target.files) {
          toBase64(file).then(result => {
            const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
            const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)
            this.userInsertReqDto.patchValue({
              ext: resultExtension, file: resultBase64
            })
            console.log(resultBase64)
            console.log(resultExtension)
          })
        }
      }
}