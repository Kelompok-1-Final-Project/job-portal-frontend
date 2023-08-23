import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

interface Country {
  name: string;
}

@Component({
    selector : 'company-update',
    templateUrl : './company-update.component.html'
})
export class CompanyUpdateComponent{
  selectedCountry: Country | undefined;
  countries: Country[] = [
    { name: 'Indonesia' },
    { name: 'Malaysia' },
    { name: 'Singapore' },
    { name: 'Thailand' },
    { name: 'Vietnam' },
    // Add more countries as needed
  ];
  filteredCountries: Country[];

    idParam! : number;
    companyUpdateReqDto = this.fb.group({
        companyId: [0],
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        files: [''],
        ext: ['']
    })
    constructor (
        private activatedRoute : ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private router : Router
    ){ this.filteredCountries = this.countries;}

    init(){
    }

    submit(): void {
    }

    ngOnInit():void{
    }

    updateCompany(){
      
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
    
        for (let file of event.files) {
          toBase64(file).then(result => {
            const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
            const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)
            this.companyUpdateReqDto.patchValue({
              ext:resultExtension,files:resultBase64
            })
          })
        }
      }
}