import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SkillGetResDto } from '@dto/skill/skill.get.res.dto';
import { SkillService } from '@serviceAdmin/skill.service';

interface Skills {
  skillCode: string;
  skillName: string;
}

@Component({
  selector: 'skill-list',
  templateUrl: './skill-list.component.html'
})
export class SkillListComponent implements OnInit {
  visibleAdd: boolean = false;
  visibleDelete: boolean = false;
  skills!: SkillGetResDto[]

  skillInsertReqDto = this.fb.group({
    skillName: ['']
  })

  constructor(
    private title: Title,
    private skillService: SkillService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ){
    this.title.setTitle('Skill | Job Portal Admin')
  }

  ngOnInit(): void {
    this.getAllSkill()
  }
  
  getAllSkill() {
    this.skillService.getAll().subscribe(result => {
      this.skills = result
    })
  }

  insertSkill(){
    const data = this.skillInsertReqDto.getRawValue()
    this.skillService.insert(data).subscribe(result => {
      this.visibleAdd = false
      this.router.navigateByUrl('/skills')
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