import {
  Injectable
} from "@angular/core";
import {
  UserLoginResDto
} from "@dto/user/user-login.res.dto";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  getProfile(): UserLoginResDto | null {
    const data = localStorage.getItem('data')
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  getUserId(): string {
    const profile = this.getProfile()
    if (profile && profile.userId) {
      return profile.userId
    }
    return ''
  }

  getUserEmail(): string {
    const profile = this.getProfile()
    if (profile && profile.userId) {
      return profile.userEmail
    }
    return ''
  }

}