import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SkillGetResDto } from '@dto/skill/skill.get.res.dto';
import { SkillService } from '@serviceAdmin/skill.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls:['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  visibleAdd: boolean = false;
  visibleDelete: boolean = false;
  visibleUpdate: boolean = false
  skills!: SkillGetResDto[]
  code!: string
  search: string = ''
  loading: boolean = false

  skillInsertReqDto = this.fb.group({
    skillName: ['', [Validators.required]]
  })

  skillUpdateReqDto = this.fb.group({
    skillCode: ['', [Validators.required]],
    skillName: ['', [Validators.required]]
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
    firstValueFrom(this.skillService.getAll()).then(result => {
      this.skills = result
    })
  }

  insertSkill(){
    this.loading = true
    const data = this.skillInsertReqDto.getRawValue()
    firstValueFrom(this.skillService.insert(data)).then(result => {
      this.loading = false
      this.visibleAdd = false
      this.router.navigateByUrl('/skills')
      this.getAllSkill()
    })
  }

  add() {
    this.visibleAdd = true
  }

  update(code: string){
    this.code = code
    this.skillUpdateReqDto.get('skillCode')?.setValue(code)
    this.visibleUpdate = true
  }

  updateSkill(){
    this.loading = true
    const data = this.skillUpdateReqDto.getRawValue()
    firstValueFrom(this.skillService.update(data)).then(result =>{
      this.loading = false
      this.visibleUpdate = false
    })
  }

  deleteModal(id: number) {
    this.visibleDelete = true
  }

  confirmDelete() {

  }

}