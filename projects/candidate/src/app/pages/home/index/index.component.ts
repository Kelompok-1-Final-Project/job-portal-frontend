import {
  Component,
  OnInit
} from '@angular/core';
import {
  NonNullableFormBuilder
} from '@angular/forms';
import {
  Title
} from '@angular/platform-browser';
import {
  Router
} from '@angular/router';
import {
  IndustryGetResDto
} from '@dto/industry/industry.get.res.dto';
import {
  IndustryService
} from '@serviceCandidate/industry.service';


@Component({
  selector: 'home-index',
  templateUrl: './index.component.html'
})
export class HomeComponent implements OnInit {

  constructor(
    private industryService: IndustryService,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {
    this.title.setTitle('Industry | InLook')
  }

  industries!: IndustryGetResDto[]

  carouselImages = [
    'https://www.istockphoto.com/id/foto/lanskap-gunung-gm517188688-89380423?phrase=alam%20dan%20lanskap',
    'url-to-image-2',
    'url-to-image-3'
  ];

  getAllIndustry() {
    this.industryService.getAll().subscribe(result => {
      this.industries = result
    })
  }
  ngOnInit(): void {
    this.getAllIndustry();
  }

}