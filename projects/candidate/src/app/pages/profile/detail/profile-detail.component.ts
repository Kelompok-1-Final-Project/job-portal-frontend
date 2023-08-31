import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder, Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  CandidateGetResDto
} from '@dto/candidate/candidate.get.res.dto';
import { DegreeGetResDto } from '@dto/degree/relationship.get.res.dto';
import { EducationGetResDto } from '@dto/education/education.get.res.dto';
import { FamilyGetResDto } from '@dto/family/family.get.res.dto';
import { LevelGetResDto } from '@dto/level/level.get.res.dto';
import { OrganizationGetResDto } from '@dto/organization/organization.get.res.dto';
import { GenderGetResDto } from '@dto/profile/gender.get.res.dto';
import { MaritalGetResDto } from '@dto/profile/marital.get.res.dto';
import { PersonTypeGetResDto } from '@dto/profile/person-type.get.res.dto';
import { RelationshipGetResDto } from '@dto/relationship/relationship.get.res.dto';
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
import { FamilyService } from '@serviceCandidate/family.service';
import { ProfileService } from '@serviceCandidate/profile.service';
import { SkillService } from '@serviceCandidate/skill.service';
import { convertUTCToLocalDate } from '@utils/date-convert.util';

@Component({
  selector: 'profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls : ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit,AfterViewChecked {

  visibleEditUser: boolean = false;
  visibleAddEducation: boolean = false;
  visibleUpdateEducation: boolean = false;
  visibleDeleteEducation: boolean = false;
  visibleAddWorkExp: boolean = false;
  visibleUpdateWorkExp: boolean = false;
  visibleDeleteWorkExp: boolean = false;
  visibleUpdateSkill: boolean = false;
  visibleAddSkill: boolean = false;
  visibleDeleteConfirmation : boolean = false;
  visibleAddOrganization: boolean = false;
  visibleUpdateOrganization: boolean = false;
  visibleDeleteOrganization: boolean = false;
  visibleAddFamily: boolean = false;
  visibleUpdateFamily: boolean = false;
  visibleDeleteFamily: boolean = false;
  visibleUpdateCv:boolean = false;
  visibleUpdateSummary:boolean = false;

  userId!: string;
  patchId!:string;
  patchIndex!:number;
  patchImage!:string;
  userData!: CandidateGetResDto;
  educations!:EducationGetResDto[];
  workExperience!:WorkExperienceGetResDto[];
  skills!: UserSkillGetResDto[];
  allSkill!: SkillGetResDto[];
  level!:LevelGetResDto[];
  organization!:OrganizationGetResDto[];
  families! : FamilyGetResDto[];
  relationship!:RelationshipGetResDto[];
  degree!:DegreeGetResDto[];
  marital!:MaritalGetResDto[];
  gender!:GenderGetResDto[];
  personType!:PersonTypeGetResDto[];
  userBirthDate!: Date

  candidateUpdateReqDto = this.fb.group({
    candidateId: ['', [Validators.required]],
    idNumber: ['',[Validators.required]],
    fullName: ['', [Validators.required]],
    email: ['',[Validators.required]],
    birthdate: ['', [Validators.required]],
    birthdateTemp: [new Date],
    mobileNumber: ['', [Validators.required]],
    photoExt: ['', [Validators.required]],
    photoFiles: ['', [Validators.required]],
    expectedSalary: [0, [Validators.required]],
    maritalStatusCode: ['', [Validators.required]],
    genderCode: ['', [Validators.required]]
  })

  educationInsertReqDto = this.fb.group({
    candidateId: [''],
    educationName: ['', [Validators.required]],
    startDate: ['',[Validators.required]],
    startDateTemp:[new Date],
    endDate: ['',[Validators.required]],
    endDateTemp:[new Date]
  })

  educationUpdateReqDto = this.fb.group({
    educationId: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    educationName: ['', [Validators.required]],
    startDate: ['',[Validators.required]],
    startDateTemp:[new Date],
    endDate: ['',[Validators.required]],
    endDateTemp:[new Date]
  })

  workExperienceInsertReqDto = this.fb.group({
    candidateId: [''],
    companyName: ['', [Validators.required]],
    positionName: ['', [Validators.required]],
    startDate: ['',[Validators.required]],
    startDateTemp:[new Date],
    endDate: ['',[Validators.required]],
    endDateTemp:[new Date]
  })

  workExperienceUpdateReqDto = this.fb.group({
    experienceId: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    positionName: ['', [Validators.required]],
    startDate: ['',[Validators.required]],
    startDateTemp:[new Date],
    endDate: ['',[Validators.required]],
    endDateTemp:[new Date]
  })

  skillCandidateReqDto = this.fb.group({
    candidateId: ['', [Validators.required]],
    skillId: ['', [Validators.required]],
    levelId: ['', [Validators.required]],
  })

  organizationInsertReqDto = this.fb.group({
    candidateId: [''],
    organizationName: ['', [Validators.required]],
    positionName: ['', [Validators.required]],
    startDate: ['',[Validators.required]],
    startDateTemp:[new Date],
    endDate: ['',[Validators.required]],
    endDateTemp:[new Date],
    description: ['', [Validators.required]]
  })

  organizationUpdateReqDto = this.fb.group({
    organizationId: ['', [Validators.required]],
    candidateId: ['', [Validators.required]],
    organizationName: ['', [Validators.required]],
    positionName: ['', [Validators.required]],
    startDate: ['',[Validators.required]],
    startDateTemp:[new Date],
    endDate: ['',[Validators.required]],
    endDateTemp:[new Date],
    description: ['', [Validators.required]]
  })

  familyInsertReqDto = this.fb.group({
    userId:[''],
	  familyName : ['', [Validators.required]],
	  relationshipCode : ['', [Validators.required]],
	  degreeCode : ['', [Validators.required]],
	  birthdate : ['', [Validators.required]],
    birthdateTemp: [new Date],

  })

  familyUpdateReqDto = this.fb.group({
    familyId : ['', [Validators.required]],
	  candidateId:['', [Validators.required]],
	  familyName:['', [Validators.required]],
	  relationshipCode:['', [Validators.required]],
	  degreeCode:['', [Validators.required]],
	  birthdate:['', [Validators.required]],
    birthdateTemp: [new Date],
  })

  cvUpdateReqDto = this.fb.group({
    candidateId:[''],
    file:['', [Validators.required]],
    ext:['', [Validators.required]]
  })

  summaryUpdateReqDto = this.fb.group({
    candidateId:[''],
    summary:['', [Validators.required]]
  })

  today: Date = new Date();
  minDate: Date;
  maxDate: Date;
  constructor(
    private candidateService: CandidateService,
    private authService: AuthService,
    private profileService : ProfileService,
    private skillService : SkillService,
    private familyService : FamilyService,
    private fb: NonNullableFormBuilder,
    private cd:ChangeDetectorRef,
    private router: Router
  ) {
    this.minDate = new Date(2000, 0, 1);
    this.maxDate = this.today;
  }
  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngOnInit() {
    this.userId  = this.authService.getUserId();
    this.patchImage = "https://via.placeholder.com/150";
    this.getCandidateData();
    this.getCandidateEducation();
    this.getCandidateWorkExperience();
    this.getCandidateSkill();
    this.getCandidateOrganization();
    this.getCandidateFamily();
    this.getAllRelationship();
    this.getAllDegree();
    this.getAllMaritalStatus();
    this.getAllGender();
    this.getAllLevel();
    this.getAllSkills();
  }


  // User
  editUser() {
    this.visibleEditUser = true;
    this.userBirthDate = new Date(this.userData.birthDate);
    this.candidateUpdateReqDto.get('candidateId')?.setValue(this.userId);
    this.candidateUpdateReqDto.get('fullName')?.setValue(this.userData.fullName);
    this.candidateUpdateReqDto.get('email')?.setValue(this.userData.email);
    this.candidateUpdateReqDto.get('birthdateTemp')?.setValue(this.userBirthDate);
    this.candidateUpdateReqDto.get('birthdate')?.setValue(this.userBirthDate.toISOString());
    this.candidateUpdateReqDto.get('mobileNumber')?.setValue(this.userData.phone);
    this.candidateUpdateReqDto.get('idNumber')?.setValue(this.userData.idNumber);
    this.candidateUpdateReqDto.get('expectedSalary')?.setValue(this.userData.expectedSalary);
    this.candidateUpdateReqDto.get('genderCode')?.setValue(this.userData.genderCode);
    this.candidateUpdateReqDto.get('maritalStatusCode')?.setValue(this.userData.maritalStatusCode);
  }

  convertCandidateDate(e : any){
    const birthConvert = new Date(convertUTCToLocalDate(e));
    this.candidateUpdateReqDto.patchValue({
      birthdate: birthConvert.toISOString()
    })
  }

  convertFamilyInsertDate(e : any){
    const birthConvert = new Date(convertUTCToLocalDate(e));
    this.familyInsertReqDto.patchValue({
      birthdate: birthConvert.toISOString()
    })
  }

  
  convertFamilyUpdateDate(e : any){
    const birthConvert = new Date(convertUTCToLocalDate(e));
    this.familyUpdateReqDto.patchValue({
      birthdate: birthConvert.toISOString()
    })
  }

  convertExperienceInsertStartDate(e : any){
    const startDate = new Date(convertUTCToLocalDate(e));
    this.workExperienceInsertReqDto.patchValue({
      startDate: startDate.toISOString()
    })
  }

  convertExperienceInsertEndDate(e : any){
    const endDate = new Date(convertUTCToLocalDate(e));
    this.workExperienceInsertReqDto.patchValue({
      endDate: endDate.toISOString()
    })
  }

  convertExperienceUpdateStartDate(e : any){
    const startDate = new Date(convertUTCToLocalDate(e));
    this.workExperienceUpdateReqDto.patchValue({
      startDate: startDate.toISOString()
    })
  }

  convertExperienceUpdateEndDate(e : any){
    const endDate = new Date(convertUTCToLocalDate(e));
    this.workExperienceUpdateReqDto.patchValue({
      endDate: endDate.toISOString()
    })
  }
  
  convertOrganizationInsertStartDate(e : any){
    const startDate = new Date(convertUTCToLocalDate(e));
    this.organizationInsertReqDto.patchValue({
      startDate: startDate.toISOString()
    })
  }

  convertOrganizationInsertEndDate(e : any){
    const endDate = new Date(convertUTCToLocalDate(e));
    this.organizationInsertReqDto.patchValue({
      endDate: endDate.toISOString()
    })
  }

  convertOrganizationUpdateStartDate(e : any){
    const startDate = new Date(convertUTCToLocalDate(e));
    this.organizationUpdateReqDto.patchValue({
      startDate: startDate.toISOString()
    })
  }

  convertOrganizationUpdateEndDate(e : any){
    const endDate = new Date(convertUTCToLocalDate(e));
    this.organizationUpdateReqDto.patchValue({
      endDate: endDate.toISOString()
    })
  }

  convertEducationInsertStartDate(e : any){
    const startDate = new Date(convertUTCToLocalDate(e));
    this.educationInsertReqDto.patchValue({
      startDate: startDate.toISOString()
    })
  }

  convertEducationInsertEndDate(e : any){
    const endDate = new Date(convertUTCToLocalDate(e));
    this.educationInsertReqDto.patchValue({
      endDate: endDate.toISOString()
    })
  }

  convertEducationUpdateStartDate(e : any){
    const startDate = new Date(convertUTCToLocalDate(e));
    this.educationUpdateReqDto.patchValue({
      startDate: startDate.toISOString()
    })
  }

  convertEducationUpdateEndDate(e : any){
    const endDate = new Date(convertUTCToLocalDate(e));
    this.educationUpdateReqDto.patchValue({
      endDate: endDate.toISOString()
    })
  }

  getCandidateData() {
    this.candidateService.getCandidateByid(this.userId).subscribe(result => {
      this.userData = result;
    })
  }

  getAllMaritalStatus(){
    this.profileService.getAllMarital().subscribe(result => {
      this.marital = result;
    })
  }

  getAllGender(){
    this.profileService.getAllGender().subscribe(result => {
      this.gender = result;
    })
  }

  submitUpdateCandidate(){
    const data = this.candidateUpdateReqDto.getRawValue();
    data.candidateId = this.authService.getUserId();
    this.profileService.updateProfile(data).subscribe(result => {
      console.log(data);
      this.visibleEditUser = false;
      this.getCandidateData();
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
      this.getCandidateEducation();
    })
  }

  submitUpdateEducation(){
    const data = this.educationUpdateReqDto.getRawValue()
    data.candidateId = this.userId;
    data.educationId = this.patchId;
    this.profileService.updateEducation(data).subscribe(result => {
      this.visibleUpdateEducation = false;
      this.getCandidateEducation();
    })
  }

  submitDeleteEducation(){
    this.profileService.deleteEducation(this.patchId).subscribe(result => {
      this.visibleDeleteEducation = false;
      this.getCandidateEducation();
    })
  }

  addEducation() {
    this.visibleAddEducation = true;
  }
  updateEducation(id: string,index:number) {
    this.patchId = id;
    this.educationUpdateReqDto.get('educationName')?.setValue(this.educations[index].educationName);
    this.educationUpdateReqDto.get('startDateTemp')?.setValue(new Date(this.educations[index].startDate));
    this.educationUpdateReqDto.get('endDateTemp')?.setValue(new Date(this.educations[index].endDate));
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
      this.getCandidateWorkExperience();
    })
  }

  submitUpdateWorkExp(){
    const data = this.workExperienceUpdateReqDto.getRawValue()
    data.candidateId = this.userId;
    data.experienceId = this.patchId;
    this.profileService.updateWorkExp(data).subscribe(result => {
      this.visibleUpdateWorkExp = false;
      this.getCandidateWorkExperience();
    })
  }

  submitDeleteWorkExp(){
    this.profileService.deleteWorkExp(this.patchId).subscribe(result => {
      this.visibleDeleteWorkExp = false;
      this.getCandidateWorkExperience();
    })
  }

  addWorkExp() {
    this.visibleAddWorkExp = true;
  }
  updateWorkExp(id: string,index:number) {
    this.patchId = id;
    this.visibleUpdateWorkExp = true;
    this.workExperienceUpdateReqDto.get('companyName')?.setValue(this.workExperience[index].companyName);
    this.workExperienceUpdateReqDto.get('positionName')?.setValue(this.workExperience[index].positionName);
    this.workExperienceUpdateReqDto.get('startDateTemp')?.setValue(new Date(this.workExperience[index].startDate));
    this.workExperienceUpdateReqDto.get('endDateTemp')?.setValue(new Date(this.workExperience[index].endDate));
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

  submitAddSkillCandidate(){
    const data = this.skillCandidateReqDto.getRawValue();
    this.skillService.insertSkillCandidate(data).subscribe(result => {
      this.visibleAddSkill = false;
      this.getCandidateSkill();
    })
  }

  submitDeleteSkill(){
    this.skillService.deleteSkillCandidate(this.patchId).subscribe(result => {
      this.visibleDeleteConfirmation = false;
      this.getCandidateSkill();
    })
  }
  
  deleteSkill(id:string){
    this.patchId = id;
    this.visibleDeleteConfirmation=true;
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

  updateSkill() {
    this.visibleUpdateSkill = true;
  }

  updateLevelSkill(){

  }

  addSkill() {
    this.visibleAddSkill = true;
    this.skillCandidateReqDto.get('candidateId')?.setValue(this.userId);
  }


  // Organization
  getCandidateOrganization(){
    this.profileService.getOrganizations(this.userId).subscribe(result => {
      this.organization= result
    })
  }

  insertOrganization(){
    const data = this.organizationInsertReqDto.getRawValue();
    data.candidateId = this.userId;
    this.profileService.insertOrganiztion(data).subscribe(result => {
      this.visibleAddOrganization = false;
      this.getCandidateOrganization();
    })
  }

  submitUpdateOrganization(){
    const data = this.organizationUpdateReqDto.getRawValue()
    data.candidateId = this.userId;
    data.organizationId = this.patchId;
    this.profileService.updateOrganization(data).subscribe(result => {
      this.visibleUpdateOrganization = false;
      this.getCandidateOrganization();
    })
  }

  submitDeleteOrganization(){
    this.profileService.deleteOrganization(this.patchId).subscribe(result => {
      this.visibleDeleteOrganization = false;
      this.getCandidateOrganization();
    })
  }

  addOrganization() {
    this.visibleAddOrganization = true;
  }
  updateOrganization(id: string,index:number) {
    this.patchId = id;
    this.visibleUpdateOrganization = true;
    this.organizationUpdateReqDto.get('organizationName')?.setValue(this.organization[index].organizationName);
    this.organizationUpdateReqDto.get('positionName')?.setValue(this.organization[index].positionName);
    this.organizationUpdateReqDto.get('description')?.setValue(this.organization[index].description);
    this.organizationUpdateReqDto.get('startDateTemp')?.setValue(new Date(this.organization[index].startDate));
    this.organizationUpdateReqDto.get('endDateTemp')?.setValue(new Date(this.organization[index].endDate));
  }
  deleteOrganization(id: string) {
    this.patchId = id;
    this.visibleDeleteOrganization = true;

  }

  //Resume
  getCandidateResume(){
    this.profileService.getOrganizations(this.userId).subscribe(result => {
      this.organization= result
    })
  }

  // Family
  getCandidateFamily(){
    this.profileService.getFamily(this.userId).subscribe(result => {
      this.families= result
    })
  }

  getAllRelationship(){
    this.familyService.getAllRelationship().subscribe(result => {
      this.relationship= result
    })
  }

  getAllDegree(){
    this.familyService.getAllDegree().subscribe(result => {
      this.degree= result
    })
  }

  insertFamily(){
    const data = this.familyInsertReqDto.getRawValue()
    data.userId = this.userId;
    this.familyService.insertFamily(data).subscribe(result => {
      this.visibleAddFamily = false;
      this.getCandidateFamily();
    })
  }

  submitUpdateFamily(){
    const data = this.familyUpdateReqDto.getRawValue()
    data.candidateId = this.userId;
    data.familyId = this.patchId;
    this.familyService.updateFamily(data).subscribe(result => {
      this.visibleUpdateFamily = false;
      this.getCandidateFamily();
    })
  }

  submitDeleteFamily(){
    this.familyService.deleteFamily(this.patchId).subscribe(result => {
      this.visibleDeleteFamily = false;
      this.getCandidateFamily();
    })
  }

  addFamily() {
    this.visibleAddFamily = true;
  }
  updateFamily(id: string,index:number) {
    this.patchId = id;
    this.visibleUpdateFamily = true;
    this.familyUpdateReqDto.get('familyName')?.setValue(this.families[index].familyName);
    this.familyUpdateReqDto.get('relationshipCode')?.setValue(this.families[index].relationshipCode);
    this.familyUpdateReqDto.get('degreeCode')?.setValue(this.families[index].degreeCode);
    this.familyUpdateReqDto.get('birthdateTemp')?.setValue(new Date(this.families[index].familyBirthDate));
  }
  deleteFamily(id: string) {
    this.patchId = id;
    this.visibleDeleteFamily = true;
  }

  updateSummary(){
    this.visibleUpdateSummary=true;
    this.summaryUpdateReqDto.get('summary')?.setValue(this.userData.summary);
  }

  submitUpdateSummary(){
    const data = this.summaryUpdateReqDto.getRawValue();
    data.candidateId = this.userId;
    this.profileService.updateSummary(data).subscribe(result => {
      this.visibleUpdateSummary = false;
      this.getCandidateData();
    })
  }

  updateCv(){
    this.visibleUpdateCv=true;
  }

  submitUpdateCv(){
    const data = this.cvUpdateReqDto.getRawValue();
    data.candidateId = this.userId;
    this.profileService.updateCv(data).subscribe(result => {
      this.visibleUpdateCv = false;
      this.getCandidateData();
    })
  }

  fileUpload(event: any) {
    const toBase64 = (file: File) => new Promise < string > ((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)
        this.candidateUpdateReqDto.patchValue({
          photoExt: resultExtension,
          photoFiles: resultBase64
        })
      })
    }
  }

  cvUpload(event: any) {
    const toBase64 = (file: File) => new Promise < string > ((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)
        this.cvUpdateReqDto.patchValue({
          ext: resultExtension,
          file: resultBase64
        })
      })
    }
  }
}