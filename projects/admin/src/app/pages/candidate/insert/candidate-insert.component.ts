import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { GenderGetResDto } from "@dto/profile/gender.get.res.dto";
import { MaritalGetResDto } from "@dto/profile/marital.get.res.dto";
import { ProfileService } from "@serviceAdmin/profile.service";

interface Country {
  name: string;
}

@Component({
  selector: 'candidate-insert',
  templateUrl: './candidate-insert.component.html'
})
export class CandidateInsertComponent implements AfterViewChecked {
  selectedCountry: Country | undefined;
  countries: Country[] = [
    { name: 'Indonesia' },
    { name: 'Malaysia' },
    { name: 'Singapore' },
    { name: 'Thailand' },
    { name: 'Vietnam' },
  ];
  filteredCountries: Country[];

  marital!: MaritalGetResDto[]
  gender!: GenderGetResDto[]

  constructor(private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private profileService: ProfileService
  ) {
    this.filteredCountries = this.countries;
  }

  ngOnInit(): void {
    this.getMaritalStatus()
    this.getGender()
  }

  ngAfterViewChecked(): void {

  }

  getMaritalStatus(){
    this.profileService.getMaritalStatus().subscribe(result =>{
      this.marital = result
    })
  }

  getGender(){
   this.profileService.getGender().subscribe(result => {
    this.gender = result
   })
  }
}