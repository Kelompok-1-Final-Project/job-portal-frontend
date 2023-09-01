import {
  Component
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from "@angular/forms";
import {
  Title
} from "@angular/platform-browser";
import {
  Router
} from "@angular/router";
import { UserService } from "@serviceCandidate/user.service";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'register.component.html',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent {
  loading = false;
  heading = true;
  userInsertReqDto = this.fb.group({
    email: ['', [Validators.email]],
    pass: ['', [Validators.required]],
    fullname: ['', [Validators.required]],
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private userService : UserService,
    private title: Title,
    private router: Router) {
    this.title.setTitle('Registration | InLook');
  }

  showHeading() {
    this.heading = !this.heading;
  }
  insert() {
    const data = this.userInsertReqDto.getRawValue()
    if (this.userInsertReqDto.valid) {
      this.loading=true;
      firstValueFrom(this.userService.insert(data))
      .then(result => {
        this.loading=false;
        this.router.navigateByUrl('/login')
      }).catch(()=> {
        this.loading = false;
      })
    }
  }
}
