import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { FamilyAdminGetResDto } from "@dto/family/family-admin.get.res.dto";
import { WorkExperienceGetResDto } from "@dto/workexperience/work-experience.get.res.dto";
import { CandidateService } from "@serviceAdmin/candidate.service";
import { firstValueFrom } from "rxjs";

@Component({
    selector: 'candidate-detail',
    templateUrl: './candidate-detail.component.html'
})
export class CandidateDetailComponent implements OnInit {

    families!: FamilyAdminGetResDto[]
    experiences!: WorkExperienceGetResDto[]
    candidateId!: string
    visibleExperience: boolean = false
    visibleFamily: boolean = false

    experienceInsertReqDto = this.fb.group({
        candidateEmail : ['', [Validators.required]],
        positionName: ['', [Validators.required]],
        companyName: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
    })

    familyInsertReqDto = this.fb.group({
        candidateId : ['', [Validators.required]],
        userEmail: ['', [Validators.required]]
    })

    constructor(
        private candidateService: CandidateService,
        private title: Title,
        private route: ActivatedRoute,
        private fb: NonNullableFormBuilder
    ) {
        this.title.setTitle('Candidate Detail | Job Portal Admin')
    }

    ngOnInit(): void {
        firstValueFrom(this.route.params).then(param => {
            this.candidateId = param['id']
            this.getFamily()
            this.getExperience()
        })
    }

    getFamily() {
        firstValueFrom(this.candidateService.getFamily(this.candidateId)).then(result => {
            this.families = result
        })
    }

    getExperience(){
        firstValueFrom(this.candidateService.getExperience(this.candidateId)).then(result => {
            this.experiences = result
        })
    }

    addExperience(){
        this.visibleExperience = true
    }

    addFamily(){
        this.visibleFamily = true
    }

    insertExperience(){
        const data = this.experienceInsertReqDto.getRawValue()
        firstValueFrom(this.candidateService.insertExperience(data)).then(result => {
            this.visibleExperience = false
        })
    }

    insertFamily(){
        
    }
}