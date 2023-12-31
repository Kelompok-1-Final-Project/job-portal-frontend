import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

interface Country {
  name: string;
}

@Component({
  selector: 'candidate-update',
  templateUrl: './candidate-update.component.html'
})
export class CandidateUpdateComponent implements AfterViewChecked {

  loading: boolean = false

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

  constructor(
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
  ) {
    this.filteredCountries = this.countries;
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {

  }
}