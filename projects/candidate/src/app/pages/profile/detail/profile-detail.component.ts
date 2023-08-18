import {
  Component,
  OnInit
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserGetResDto } from '@dto/user/user.get.res.dto';
import { UserSkillGetResDto } from '@dto/userskill/user-skill.get.res.dto';
import { AuthService } from '@serviceCandidate/auth.service';
import { CandidateService } from '@serviceCandidate/candidate.service';
import { UserService } from '@serviceCandidate/user.service';


@Component({
  selector: 'profile-detail',
  templateUrl: './profile-detail.component.html'
})
export class ProfileDetailComponent implements OnInit {

  visibleEditUser: boolean = false;
  visibleAddEducation: boolean = false;
  visibleUpdateEducation: boolean = false;
  visibleDeleteEducation: boolean = false;
  visibleAddWorkExp: boolean = false;
  visibleUpdateWorkExp: boolean = false;
  visibleDeleteWorkExp: boolean = false;
  visibleUpdateSkill: boolean = false;
  visibleAddSkill: boolean = false;
  visibleAddOrganization: boolean = false;
  visibleUpdateOrganization: boolean = false;
  visibleDeleteOrganization: boolean = false;
  visibleAddFamily: boolean = false;
  visibleUpdateFamily: boolean = false;
  visibleDeleteFamily: boolean = false;

  userId!:string;
  userName!:string;
  userData! : UserGetResDto;
  skilss! : UserSkillGetResDto[];

  constructor(
    private candidateService : CandidateService, 
    private authService : AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    // this.userId  = this.authService.getUserId();
    this.userId  = '';
    this.userName  = '';

    const data = this.candidateService.getCandidateByid(this.userName,true).subscribe(result => {
        this.userData = result
    })
  }


  // User
  editUser() {
    this.visibleEditUser = true;
  }

  // Education
  addEducation() {
    this.visibleAddEducation = true;
  }
  updateEducation(id: number) {
    this.visibleUpdateEducation = true;
  }
  deleteEducation(id: number) {
    this.visibleDeleteEducation = true;
  }

  // Work Experience
  addWorkExp() {
    this.visibleAddWorkExp = true;
  }
  updateWorkExp(id: number) {
    this.visibleUpdateWorkExp = true;
  }
  deleteWorkExp(id: number) {
    this.visibleDeleteWorkExp = true;
  }

  // Skill

  getAllSkill(){
    
  }

  updateSkill(id: number) {
    this.visibleUpdateSkill = true;
  }
  addSkill(id: number) {
    this.visibleAddSkill = true;
  }

  // Organization
  addOrganization() {
    this.visibleAddOrganization = true;
  }
  updateOrganization(id: number) {
    this.visibleUpdateOrganization = true;
  }
  deleteOrganization(id: number) {
    this.visibleDeleteOrganization = true;
  }

  // Organization
  addFamily() {
    this.visibleAddFamily = true;
  }
  updateFamily(id: number) {
    this.visibleUpdateFamily = true;
  }
  deleteFamily(id: number) {
    this.visibleDeleteFamily = true;
  }
}