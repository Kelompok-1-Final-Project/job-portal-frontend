import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { CandidateProfileGetResDto } from "@dto/candidate/candidate-profile.get.res.dto";
import { EducationGetResDto } from "@dto/education/education.get.res.dto";
import { FamilyAdminGetResDto } from "@dto/family/family-admin.get.res.dto";
import { OrganizationGetResDto } from "@dto/organization/organization.get.res.dto";
import { UserSkillAdminGetResDto } from "@dto/userskill/user-skill-admin.get.res.dto";
import { WorkExperienceGetResDto } from "@dto/workexperience/work-experience.get.res.dto";
import { CandidateService } from "@serviceAdmin/candidate.service";
import { EducationService } from "@serviceAdmin/education.service";
import { OrganizationService } from "@serviceAdmin/organization.service";
import { SkillService } from "@serviceAdmin/skill.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'candidate-detail',
    templateUrl: './candidate-detail.component.html',
    styleUrls:['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {

    families!: FamilyAdminGetResDto[]
    experiences!: WorkExperienceGetResDto[]
    candidateId!: string
    visibleExperience: boolean = false
    visibleFamily: boolean = false
    candidateProfile?: CandidateProfileGetResDto
    organizations!: OrganizationGetResDto[]
    skills!: UserSkillAdminGetResDto[]
    educations!: EducationGetResDto[]

    experienceInsertReqDto = this.fb.group({
        candidateEmail: ['', [Validators.required]],
        positionName: ['', [Validators.required]],
        companyName: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
    })

    familyInsertReqDto = this.fb.group({
        candidateId: ['', [Validators.required]],
        userEmail: ['', [Validators.required]]
    })

    constructor(
        private candidateService: CandidateService,
        private title: Title,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder,
        private organizationService: OrganizationService,
        private skillService: SkillService,
        private educationService: EducationService
    ) {
        this.title.setTitle('Candidate Detail | Job Portal Admin')
    }

    ngOnInit(): void {
        firstValueFrom(this.route.params).then(param => {
            this.candidateId = param['id']
            this.getDetailCandidate()
            this.getFamily()
            this.getExperience()
            this.getOrganizations()
            this.getSkills()
            this.getEducations()
        })
    }

    getFamily() {
        firstValueFrom(this.candidateService.getFamily(this.candidateId)).then(result => {
            this.families = result
        })
    }

    getExperience() {
        firstValueFrom(this.candidateService.getExperience(this.candidateId)).then(result => {
            this.experiences = result
        })
    }

    addExperience() {
        this.visibleExperience = true
    }

    addFamily() {
        this.visibleFamily = true
    }

    insertExperience() {
        const data = this.experienceInsertReqDto.getRawValue()
        firstValueFrom(this.candidateService.insertExperience(data)).then(result => {
            this.visibleExperience = false
        })
    }

    insertFamily() {
        
    }

    getDetailCandidate() {
        firstValueFrom(this.candidateService.getCandidateDetail(this.candidateId)).then(result => {
            this.candidateProfile = result
        })
    }

    getOrganizations(){
        firstValueFrom(this.organizationService.getByCandidate(this.candidateId)).then(result => {
            this.organizations = result 
        })
    }

    getSkills(){
        firstValueFrom(this.skillService.getCandidateSkill(this.candidateId)).then(result =>{
            this.skills = result
        })
    }

    getEducations(){
        firstValueFrom(this.educationService.getByCandidate(this.candidateId)).then(result => {
            this.educations = result
        })
    }
}