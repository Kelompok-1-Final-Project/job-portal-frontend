import {
  Component,
  OnInit
} from "@angular/core";
// import {
//   AuthService
// } from "../../services/auth.service";
// import {
//   RoleCode
// } from "src/app/constant/role.code";
import {
  Route,
  Router
} from "@angular/router";
import {
  MenuItem
} from 'primeng/api';
import { AuthService } from "../../service/auth.service";
import { BASE_URL, BASE_URL_CAN } from "@constant/api.constant";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  imgUrl!: string;
  imgUrlAdmin!: string;
  logoWeb!: string;
  roleCode!: string;
  isAdmin!: boolean;
  isCandidate!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  login(): void {
    this.router.navigateByUrl("/login");
  }

  // contoh
  items: MenuItem[] | undefined;
  itemsCandidate: MenuItem[] | undefined;

  ngOnInit() {

    const profilePhoto = this.authService.getUserPhoto();
    const profile = this.authService.getProfile();
    if (profilePhoto != null) {
      this.imgUrl = `${BASE_URL_CAN}/files/${profilePhoto}`;
      this.imgUrlAdmin = `${BASE_URL}/files/${profilePhoto}`;
    } else {
      this.imgUrl = '../../../assets/images/avatar.png';
      this.imgUrlAdmin = '../../../assets/images/avatar.png';
    }

    if (profile?.roleCode != undefined) {
      this.isAdmin = true;
      this.isCandidate = false;
    } else {
      this.isCandidate = true;
      this.isAdmin = false;
    }
    this.logoWeb = '/assets/logo.png';

    this.items = [{
      label: 'InLook - Job Portal',
      icon: 'pi pi-fw pi-ticket',
      routerLink: "/dashboard",
    }, {
      label: 'Home',
      icon: 'pi pi-spin pi-box',
      routerLink: "/dashboard",
    },
    {
      label: 'Master Data',
      icon: "pi pi-fw pi-server",
      items: [{
        label: 'User',
        routerLink: "/users",
        icon: 'pi pi-fw pi-user',
        // visible : this.isAdmin
      },
      {
        label: 'Company',
        routerLink: "/companies",
        icon: 'pi pi-fw pi-building',
        // visible : this.isAdmin
      },
      {
        label: 'Benefit',
        routerLink: "/benefits",
        icon: 'pi pi-fw pi-book',
        // visible : this.isAdmin
      },
      {
        label: 'Candidate',
        routerLink: "/candidates",
        icon: 'pi pi-fw pi-box',
        // visible : this.isAdmin
      },
      {
        label: 'City',
        routerLink: "/cities",
        icon: 'pi pi-fw pi-users',
        // visible : this.isAdmin
      },
      {
        label: 'Industry',
        routerLink: "/industries",
        icon: 'pi pi-fw pi-box',
        // visible : this.isCustomer
      },
      {
        label: 'Skill',
        routerLink: "/skills",
        icon: 'pi pi-fw pi-ticket',
        // visible : this.isPic
      },
      {
        label: 'Employee',
        icon: 'pi pi-fw pi-user',
        routerLink: "/employees"
      },
      {
        label: 'Question',
        icon: 'pi pi-fw pi-ticket',
        routerLink: "/questions",
        // visible : this.isDeveloper
      }
      ]
    },
    {
      label: 'Candidate Status',
      icon: 'pi pi-fw pi-power-off',
      items: [
        {
          label: 'Application',
          routerLink: "/candidate-statuses/application",
          icon: 'pi pi-fw pi-user',
          // visible : this.isAdmin
        },
        {
          label: 'Assessment',
          routerLink: "/candidate-statuses/assessment",
          icon: 'pi pi-fw pi-user',
          // visible : this.isAdmin
        },
        {
          label: 'Medical Checkup',
          routerLink: "/candidate-statuses/mcu",
          icon: 'pi pi-fw pi-user',
          // visible : this.isAdmin
        },
        {
          label: 'Interview',
          routerLink: "/candidate-statuses/interview",
          icon: 'pi pi-fw pi-user',
          // visible : this.isAdmin
        },
        {
          label: 'Offering',
          routerLink: "/candidate-statuses/offering",
          icon: 'pi pi-fw pi-user',
          // visible : this.isAdmin
        },
        {
          label: 'Hired',
          routerLink: "/candidate-statuses/hired",
          icon: 'pi pi-fw pi-user',
          // visible : this.isAdmin
        },
        {
          label: 'Blacklist',
          icon: 'pi pi-fw pi-ticket',
          routerLink: "/blacklist",
          // visible : this.isDeveloper
        }
      ]
    },
    {
      label: 'Job vacancy',
      routerLink: "/job-vacancies",
      icon: 'pi pi-fw pi-ticket',
      // visible : this.isCustomer
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [{
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: "/users/profile",
      },
      {
        label: 'Change Password',
        icon: 'pi pi-fw pi-cog',
        routerLink: "/users/change-password",
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout()
        }
      }
      ]
    },
    {
      label: 'Quit',
      icon: 'pi pi-fw pi-power-off',
      command: () => {
        this.logout()
      }
    }
    ];

    // ========================================================

    this.itemsCandidate = [{
      label: 'InLook - Home',
      icon: 'pi pi-fw pi-ticket',
      routerLink: "/home",
    },
    {
      label: 'Job vacancy',
      routerLink: "/home/job",
      icon: 'pi pi-fw pi-ticket',
      // visible : this.isCustomer
    },
    {
      label: 'Company',
      routerLink: "/companies",
      icon: 'pi pi-fw pi-building',
      // visible : this.isAdmin
    },
    {
      label: 'Save Jobs',
      routerLink: "/home/save-jobs",
      icon: 'pi pi-fw pi-heart',
      // visible : this.isAdmin
    },
    {
      label: 'Test Skill',
      icon: 'pi pi-fw pi-ticket',
      routerLink: "/tests",
      // visible : this.isDeveloper
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-user',
      items: [{
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: "/profile",
      },
      {
        label: 'My Applications',
        icon: 'pi pi-fw pi-cog',
        routerLink: "/status-progress",
      },
      {
        label: 'Change Password',
        icon: 'pi pi-fw pi-cog',
        routerLink: "/profile/change-password",
      }
      ]
    }
    ];

    if (profile) {
      this.itemsCandidate.push({
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
        }
      });
    } else {
      this.itemsCandidate.push({
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        command: () => {
          this.login();
        }
      });
    }

  }
}