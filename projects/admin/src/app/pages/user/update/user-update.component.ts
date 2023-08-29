import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";

interface Country {
  name: string;
}

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html'
})
export class UserUpdateComponent implements OnInit, AfterViewChecked {

  jobId!: string

  userUpdateReqDto = this.fb.group({

  })

  constructor(
    private fb: NonNullableFormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private title: Title,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    firstValueFrom(this.route.params).then(param =>{
      this.jobId = param['id']
    })
  }

  ngAfterViewChecked(): void {

  }
}