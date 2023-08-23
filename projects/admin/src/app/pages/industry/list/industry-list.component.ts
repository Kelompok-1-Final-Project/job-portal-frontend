import { Component, OnInit } from '@angular/core';
import { IndustryGetResDto } from '@dto/industry/industry.get.res.dto';
import { IndustryService } from '@serviceAdmin/industry.service';
import { Title } from '@angular/platform-browser';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

interface Industries {
  industryCode: string;
  industryName: string;
}

@Component({
  selector: 'industry-list',
  templateUrl: './industry-list.component.html'
})
export class IndustryListComponent implements OnInit {
  visibleAdd: boolean = false;
  visibleDelete: boolean = false;

  industryInsertReqDto = this.fb.group({
    industryName: ['']
  })

  constructor(
    private industryService: IndustryService,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {
    this.title.setTitle('Industry | Job Portal Admin')
  }
  industries!: IndustryGetResDto[]

  ngOnInit(): void {
    this.getAllIndustry();
    console.log(this.industries)
  }

  getAllIndustry() {
    this.industryService.getAll().subscribe(result => {
      this.industries = result
    })
  }

  insertIndustry() {
    const data = this.industryInsertReqDto.getRawValue()
    this.industryService.insert(data).subscribe(result => {
      this.router.navigateByUrl('/industries')
      this.visibleAdd = false
    })
  }

  add() {
    this.visibleAdd = true;
  }

  deleteModal(id: number) {
    this.visibleDelete = true;
  }

  confirmDelete() {

  }

}