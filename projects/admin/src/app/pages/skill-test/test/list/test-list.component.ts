import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SkillTestGetResDto } from '@dto/skilltest/skill-test.get.res.dto';
import { SkillTestService } from '@serviceAdmin/skilltest.service';

@Component({
  selector: 'test-list',
  templateUrl: './test-list.component.html'
})
export class TestListComponent implements OnInit {
  visibleAdd: boolean = false;
  visibleUpdate: boolean = false;
  visibleDelete: boolean = false;
  skilltests!: SkillTestGetResDto[]
  
  constructor(
    private skillTestService: SkillTestService,
    private title: Title
  ){
    this.title.setTitle('Skill Test | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getAlltSkillTest()
  }

  getAlltSkillTest(){
    this.skillTestService.getAll().subscribe(result => {
      this.skilltests = result
    })
  }

  // add() {
  //   this.visibleAdd = true;
  // }

  // update(id: number) {
  //   this.visibleUpdate = true;
  // }

  // deleteModal(id: number) {
  //   this.visibleDelete = true;
  // }

  // confirmDelete() {

  // }

}