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
import { LevelGetResDto } from '@dto/level/level.get.res.dto';
import { OrganizationGetResDto } from '@dto/organization/organization.get.res.dto';
import { SkillGetResDto } from '@dto/skill/skill.get.res.dto';
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
import { SkillService } from '@serviceCandidate/skill.service';

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
  patchId!:string;
  patchIndex!:number;
  userData!: CandidateGetResDto;
  educations!:EducationGetResDto[];
  workExperience!:WorkExperienceGetResDto[];
  skills!: UserSkillGetResDto[];
  allSkill!: SkillGetResDto[];

  
  level!:LevelGetResDto[];
  organization!:OrganizationGetResDto[];
  families! : FamilyGetResDto[];


  educationInsertReqDto = this.fb.group({
    candidateId: ['', [Validators.required]],
    educationName: ['', [Validators.required]],
    startDate: [''],
    endDate: ['']
  })

  educationUpdateReqDto = this.fb.group({
    educationId: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    educationName: ['', [Validators.required]],
    startDate: [''],
    endDate: ['']
  })

  workExperienceInsertReqDto = this.fb.group({
    candidateId: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    positionName: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  })

  workExperienceUpdateReqDto = this.fb.group({
    experienceId: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    positionName: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  })

  organizationInsertReqDto = this.fb.group({
    candidateId: ['', [Validators.required]],
    organizationName: ['', [Validators.required]],
    positionName: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  organizationUpdateReqDto = this.fb.group({
    organizationId: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    organizationName: ['', [Validators.required]],
    positionName: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    description: ['', [Validators.required]]
  })

  constructor(
    private candidateService: CandidateService,
    private authService: AuthService,
    private profileService : ProfileService,
    private skillService : SkillService,
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

  submitUpdateEducation(){
    const data = this.educationUpdateReqDto.getRawValue()
    data.candidateId = this.userId;
    data.educationId = this.patchId;
    this.profileService.updateEducation(data).subscribe(result => {
      this.visibleAddEducation = false;
    })
  }

  submitDeleteEducation(){
    this.profileService.deleteEducation(this.patchId).subscribe(result => {
      this.visibleAddEducation = false;
    })
  }

  addEducation() {
    this.visibleAddEducation = true;
  }
  updateEducation(id: string) {
    this.patchId = id;
    this.visibleUpdateEducation = true;
  }
  deleteEducation(id: string) {
    this.patchId = id;
    this.visibleDeleteEducation = true;
  }

  // Work Experience
  getCandidateWorkExperience(){
    this.profileService.getWorkExperience(this.userId).subscribe(result => {
      this.workExperience= result
    })
  }

  insertWorkExperience(){
    const data = this.workExperienceInsertReqDto.getRawValue()
    data.candidateId = this.userId;
    this.profileService.insertWorkExp(data).subscribe(result => {
      this.visibleAddWorkExp = false;
    })
  }

  submitUpdateWorkExp(){
    const data = this.workExperienceUpdateReqDto.getRawValue()
    data.candidateId = this.userId;
    data.experienceId = this.patchId;
    this.profileService.updateWorkExp(data).subscribe(result => {
      this.visibleUpdateWorkExp = false;
    })
  }

  submitDeleteWorkExp(){
    this.profileService.deleteWorkExp(this.patchId).subscribe(result => {
      this.visibleDeleteWorkExp = false;
    })
  }

  addWorkExp() {
    this.visibleAddWorkExp = true;
  }
  updateWorkExp(id: string) {
    this.patchId = id;
    this.visibleUpdateWorkExp = true;
  }
  deleteWorkExp(id: string) {
    this.patchId = id;
    this.visibleDeleteWorkExp = true;
  }

  // Skill

  getCandidateSkill() {
    this.profileService.getSkills(this.userId).subscribe(result => {
      this.skills= result
    })
  }

  getAllLevel(){
    this.skillService.getAllLevel().subscribe(result => {
      this.level= result
    })
  }

  getAllSkills(){
    this.skillService.getAll().subscribe(result => {
      this.allSkill= result
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

  insertOrganization(){
    const data = this.organizationInsertReqDto.getRawValue()
    data.candidateId = this.userId;
    this.profileService.insertOrganiztion(data).subscribe(result => {
      this.visibleAddOrganization = false;
    })
  }

  submitUpdateOrganization(){
    const data = this.organizationUpdateReqDto.getRawValue()
    data.candidateId = this.userId;
    data.organizationId = this.patchId;
    this.profileService.updateOrganization(data).subscribe(result => {
      this.visibleUpdateOrganization = false;
    })
  }

  submitDeleteOrganization(){
    this.profileService.deleteOrganization(this.patchId).subscribe(result => {
      this.visibleDeleteOrganization = false;
    })
  }

  addOrganization() {
    this.visibleAddOrganization = true;
  }
  updateOrganization(id: string) {
    this.patchId = id;
    this.visibleUpdateOrganization = true;
  }
  deleteOrganization(id: string) {
    this.patchId = id;
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