import {
  Component,
  OnInit
} from '@angular/core';
import {
  NonNullableFormBuilder, Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  CandidateGetResDto
} from '@dto/candidate/candidate.get.res.dto';
import { EducationGetResDto } from '@dto/education/education.get.res.dto';
import { FamilyGetResDto } from '@dto/family/family.get.res.dto';
import { OrganizationGetResDto } from '@dto/organization/organization.get.res.dto';
import {
  UserGetResDto
} from '@dto/user/user.get.res.dto';
import {
  UserSkillGetResDto
} from '@dto/userskill/user-skill.get.res.dto';
import { WorkExperienceGetResDto } from '@dto/workexperience/work-experience.get.res.dto';
import {
  AuthService
} from '@serviceCandidate/auth.service';
import {
  CandidateService
} from '@serviceCandidate/candidate.service';
import { ProfileService } from '@serviceCandidate/profile.service';
import {
  UserService
} from '@serviceCandidate/user.service';


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

  userId!: string;
  userData!: CandidateGetResDto;
  educations!:EducationGetResDto[];
  workExperience!:WorkExperienceGetResDto[];
  skills!: UserSkillGetResDto[];
  organization!:OrganizationGetResDto[];
  families! : FamilyGetResDto[];


  educationInsertReqDto = this.fb.group({
    candidateId: ['', [Validators.required]],
    educationName: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  })

  constructor(
    private candidateService: CandidateService,
    private authService: AuthService,
    private profileService : ProfileService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId  = this.authService.getUserId();
    this.getCandidateData();
    this.getCandidateEducation();
    this.getCandidateWorkExperience();
    this.getCandidateSkill();
    this.getCandidateOrganization();
    this.getCandidateFamily();
  }


  // User
  editUser() {
    this.visibleEditUser = true;
  }
  getCandidateData() {
    this.candidateService.getCandidateByid(this.userId).subscribe(result => {
      this.userData = result
    })
  }

  // Education
  getCandidateEducation(){
    this.profileService.getEducation(this.userId).subscribe(result => {
      this.educations= result
    })
  }

  insertEducation(){
    const data = this.educationInsertReqDto.getRawValue()
    data.candidateId = this.userId;
    this.profileService.insertEducation(data).subscribe(result => {
      this.visibleAddEducation = false;
    })
  }

  addEducation() {
    this.visibleAddEducation = true;
  }
  updateEducation(id: string) {
    this.visibleUpdateEducation = true;
  }
  deleteEducation(id: string) {
    this.visibleDeleteEducation = true;
  }

  // Work Experience
  getCandidateWorkExperience(){
    this.profileService.getWorkExperience(this.userId).subscribe(result => {
      this.workExperience= result
    })
  }
  addWorkExp() {
    this.visibleAddWorkExp = true;
  }
  updateWorkExp(id: string) {
    this.visibleUpdateWorkExp = true;
  }
  deleteWorkExp(id: string) {
    this.visibleDeleteWorkExp = true;
  }

  // Skill

  getCandidateSkill() {
    this.profileService.getSkills(this.userId).subscribe(result => {
      this.skills= result
    })
  }

  updateSkill(id: string) {
    this.visibleUpdateSkill = true;
  }
  addSkill(id: string) {
    this.visibleAddSkill = true;
  }

  // Organization
  getCandidateOrganization(){
    this.profileService.getOrganizations(this.userId).subscribe(result => {
      this.organization= result
    })
  }

  addOrganization() {
    this.visibleAddOrganization = true;
  }
  updateOrganization(id: string) {
    this.visibleUpdateOrganization = true;
  }
  deleteOrganization(id: string) {
    this.visibleDeleteOrganization = true;
  }

  // Family
  getCandidateFamily(){
    this.profileService.getFamily(this.userId).subscribe(result => {
      this.families= result
    })
  }
  addFamily() {
    this.visibleAddFamily = true;
  }
  updateFamily(id: string) {
    this.visibleUpdateFamily = true;
  }
  deleteFamily(id: string) {
    this.visibleDeleteFamily = true;
  }
}