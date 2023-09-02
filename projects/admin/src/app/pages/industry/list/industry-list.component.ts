import { Component, OnInit } from '@angular/core';
import { IndustryGetResDto } from '@dto/industry/industry.get.res.dto';
import { IndustryService } from '@serviceAdmin/industry.service';
import { Title } from '@angular/platform-browser';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls:['./industry-list.component.css']
})
export class IndustryListComponent implements OnInit {

  visibleAdd: boolean = false;
  visibleDelete: boolean = false;
  visibleUpdate: boolean = false
  code!: string
  search: string = ''
  loading: boolean = false

  industryInsertReqDto = this.fb.group({
    industryName: ['', [Validators.required]]
  })

  industryUpdateReqDto = this.fb.group({
    industryCode: ['', [Validators.required]],
    industryName: ['', [Validators.required]]
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
  }

  getAllIndustry() {
    firstValueFrom(this.industryService.getAll()).then(result => {
      this.industries = result
    })
  }

  insertIndustry() {
    this.loading = true
    const data = this.industryInsertReqDto.getRawValue()
    firstValueFrom(this.industryService.insert(data)).then(result => {
      this.loading = false
      this.visibleAdd = false
      this.getAllIndustry()
    })
  }

  updateIndustry() {
    const data = this.industryUpdateReqDto.getRawValue()
    firstValueFrom(this.industryService.update(data)).then(result => {
      this.visibleUpdate = false
    })
  }

  add() {
    this.visibleAdd = true
  }

  deleteModal(id: number) {
    this.visibleDelete = true
  }

  update(code: string) {
    this.visibleUpdate = true
    this.code = code
    this.industryUpdateReqDto.get('industryCode')?.setValue(code)
  }

  confirmDelete() {

  }

}