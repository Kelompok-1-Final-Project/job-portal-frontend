import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";

interface Country {
  name: string;
}
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
interface QuestionOptionReqDto {
  optionData: string
  isAnswer: boolean
}
interface QuestionInsertReqDto {
  question: string
  questionOptions?: QuestionOptionReqDto[]
}

@Component({
  selector: 'job-insert',
  templateUrl: './job-insert.component.html'
})
export class JobInsertComponent implements AfterViewChecked {

  loading = false

  selectedCountry: Country | undefined;
  countries: Country[] = [
    { name: 'Indonesia' },
    { name: 'Malaysia' },
    { name: 'Singapore' },
    { name: 'Thailand' },
    { name: 'Vietnam' },
  ];
  filteredCountries: Country[];

  keyAnswer = [
    { name: 'True', value: true },
    { name: 'False', value: false }
  ]
  questionInsertDto: QuestionInsertReqDto[] = []
  questionOptionInsertdto: QuestionOptionReqDto[] = []

  questionsInsertReqDto = this.fb.group(
    {
      data: this.fb.array(this.questionInsertDto)
    }
  )

  constructor(private fb: NonNullableFormBuilder,
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

  get forms() {
    return this.questionsInsertReqDto.get("data") as FormArray
  }

  questionOption(i: number) {
    return this.forms.at(i).get("questionOptions") as FormArray
  }

  onAdd() {
    this.forms.push(this.fb.group({
      question: ['', [Validators.required]],
      questionOptions: this.fb.array(this.questionOptionInsertdto),
    }))
  }

  remove(i: number) {
    this.forms.removeAt(i)
  }

  onAddOption(indexQuestion: number) {
    this.questionOption(indexQuestion).push(this.fb.group({
      optionData: ['', [Validators.required]],
      isAnswer: [false, [Validators.required]]
    }))
  }

  onSubmit() {
    if (this.questionsInsertReqDto.valid) {
      this.loading = true
      const data = this.questionsInsertReqDto.getRawValue().data
    }
  }

  removeOption(indexOption: number, indexQuestion: number) {
    this.questionOption(indexOption).removeAt(indexQuestion)
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}