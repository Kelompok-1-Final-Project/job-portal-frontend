import { Component, OnInit } from '@angular/core';
import { BenefitGetResDto } from '@dto/benefit/benefit.get.res.dto';
import { BenefitService } from '@serviceAdmin/benefit.service';
import { Title } from '@angular/platform-browser';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'benefit-list',
  templateUrl: './benefit-list.component.html'
})
export class BenefitListComponent implements OnInit {
  visibleAdd: boolean = false;
  visibleUpdate: boolean = false;
  visibleDelete: boolean = false;
  search: string = ''
  loading: boolean = false

  benefits!: BenefitGetResDto[]
  code!: string

  benefitInsertReqDto = this.fb.group({
    benefitName: ['', [Validators.required]]
  })

  benefitUpdateReqDto = this.fb.group({
    benefitCode: ['', [Validators.required]],
    benefitName: ['', [Validators.required]]
  })

  constructor(
    private benefitService: BenefitService,
    private title: Title,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {
    this.title.setTitle('Benefit | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getAllBenefit()
  }

  getAllBenefit() {
    firstValueFrom(this.benefitService.getAll()).then(result => {
      this.benefits = result
    })
  }

  insertBenefit() {
    this.loading = true
    const data = this.benefitInsertReqDto.getRawValue()
    firstValueFrom(this.benefitService.insert(data)).then(result => {
      this.loading = false
      this.visibleAdd = false
      this.getAllBenefit()
    })
  }

  updateBenefit() {
    const data = this.benefitUpdateReqDto.getRawValue()
    firstValueFrom(this.benefitService.update(data)).then(result => {
      this.visibleUpdate = false
      this.router.navigateByUrl('/benefits')
    })
  }

  add() {
    this.visibleAdd = true
  }

  update(code: string) {
    this.visibleUpdate = true
    this.code = code
    this.benefitUpdateReqDto.get('benefitCode')?.setValue(code)
  }

  deleteModal(id: number) {
    this.visibleDelete = true
  }

}