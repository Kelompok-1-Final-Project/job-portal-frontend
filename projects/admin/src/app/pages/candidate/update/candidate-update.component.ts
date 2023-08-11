import { AfterViewChecked, ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { QuestionPackageGetResDto } from "@dto/question-package/question-package-get.req.dto";
import { QuestionTopicGetResDto } from "@dto/question-topic/question-topic-get.res.dto";
import { QuestionInsertReqDto } from "@dto/question/question-insert.req.dto";
import { QuestionOptionReqDto } from "@dto/question/question-option.req.dto";
import { PackageService } from "@service/package.service";
import { QuestionService } from "@service/question.service";
import { TopicService } from "@service/topic.service";
import { QuestionTypeGetResDto } from "@dto/question-type/question-type-get.res.dto";
import { QuestionTypeService } from "@service/question-type.service";

interface Country {
    name: string;
  }

@Component({
    selector: 'candidate-update',
    templateUrl: './candidate-update.component.html'
})
export class CandidateUpdateComponent implements AfterViewChecked {
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

    constructor(private fb: NonNullableFormBuilder,
        private topicService: TopicService,
        private packageService: PackageService,
        private questionService: QuestionService,
        private questionTypeService: QuestionTypeService,
        private cd : ChangeDetectorRef,
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