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

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {

  imgUrl!: number;
  roleCode!: string;

  constructor(
    // private authService: AuthService,
    private router: Router
  ) { }

  // ngOnInit():void{
  //     const profile = this.authService.getProfile();
  //     if(profile){
  //         this.imgUrl = profile.photoId;
  //             this.roleCode = profile.roleCode
  //     }
  // }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  // contoh
  items: MenuItem[] | undefined;
  itemsCandidate : MenuItem[] | undefined;

  ngOnInit() {

    this.items = [{
      label: 'Ticketing - Torangto',
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
        label: 'Skill Test',
        icon: 'pi pi-fw pi-ticket',
        routerLink: "/skill-test",
        // visible : this.isDeveloper
      },
      {
        label: 'Employee',
        icon: 'pi pi-fw pi-user',
        routerLink: "/employees"
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
      label: 'Question',
      icon: 'pi pi-fw pi-ticket',
      routerLink: "/questions",
      // visible : this.isDeveloper
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
      label: 'About',
      items: [{
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [{
          label: 'Save',
          icon: 'pi pi-fw pi-calendar-plus'
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-calendar-minus'
        }
        ]
      },
      {
        label: 'Contact',
        items: [{
          label: 'Remove',
          icon: 'pi pi-fw pi-calendar-minus'
        }]
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
    }, {
      label: 'Home',
      icon: 'pi pi-spin pi-box',
      routerLink: "/home",
    },
    {
      label: 'Master Data',
      icon: "pi pi-fw pi-server",
      items: [{
        label: 'jobs',
        routerLink: "/home/job",
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
        label: 'Skill Test',
        icon: 'pi pi-fw pi-ticket',
        routerLink: "/skill-test",
        // visible : this.isDeveloper
      },
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
      label: 'Question',
      icon: 'pi pi-fw pi-ticket',
      routerLink: "/questions",
      // visible : this.isDeveloper
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
      label: 'About',
      items: [{
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [{
          label: 'Save',
          icon: 'pi pi-fw pi-calendar-plus'
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-calendar-minus'
        }
        ]
      },
      {
        label: 'Contact',
        items: [{
          label: 'Remove',
          icon: 'pi pi-fw pi-calendar-minus'
        }]
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
  }
}