import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SkillGetResDto } from '@dto/skill/skill.get.res.dto';
import { SkillService } from '../../../services/skill.service';

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
  visibleUpdate: boolean = false;
  visibleDelete: boolean = false;
  skills!: SkillGetResDto[]

  constructor(
    private title: Title,
    private skillService: SkillService
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

  add() {
    this.visibleAdd = true;
  }
  update(id: number) {
    this.visibleUpdate = true;
  }

  deleteModal(id: number) {
    this.visibleDelete = true;
  }

  confirmDelete() {

  }

}