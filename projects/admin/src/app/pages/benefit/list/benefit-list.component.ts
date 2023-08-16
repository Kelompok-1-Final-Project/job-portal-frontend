import { Component, OnInit } from '@angular/core';
import { BenefitGetResDto } from '@dto/benefit/benefit.get.res.dto';
import { BenefitService } from '../../../services/benefit.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'benefit-list',
  templateUrl: './benefit-list.component.html'
})
export class BenefitListComponent implements OnInit {
  visibleAdd: boolean = false;
  visibleUpdate: boolean = false;
  visibleDelete: boolean = false;
  benefits!: BenefitGetResDto[]
  constructor(
    private benefitService: BenefitService,
    private title: Title
  ) {
    this.title.setTitle('Benefit | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getAllBenefit()
  }

  getAllBenefit() {
    this.benefitService.getAll().subscribe(result => {
      this.benefits = result
    })
  }

  add() {
    this.visibleAdd = true;
  }

  update(id: number) {
    this.visibleUpdate = true;
  }

  deleteModal(id: number) {
    this.visibleDelete = true;
  }

  // confirmDelete(){

  // }

}