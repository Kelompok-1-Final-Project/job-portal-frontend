import { Component, OnInit } from "@angular/core";

interface Vacancies {
  code: string,
  vacancyTitle:  string,
  hrPic:  string,
  userPic:  string,
  position:  string,
  endDate:  string
  }

@Component({
    selector : 'job-list',
    templateUrl : './job-list.component.html'
})
export class JobListComponent implements OnInit{
  visibleAssign:boolean=false;
  vacancies: Vacancies[] =  [
    {
      code: 'C001',
      vacancyTitle: 'Software Developer',
      hrPic: 'John HR',
      userPic: 'Jane User',
      position: 'Developer',
      endDate: '2023-08-31'
    },
    {
      code: 'C002',
      vacancyTitle: 'Data Analyst',
      hrPic: 'Alice HR',
      userPic: 'Bob User',
      position: 'Analyst',
      endDate: '2023-09-15'
    },
    {
      code: 'C003',
      vacancyTitle: 'Sales Representative',
      hrPic: 'Eva HR',
      userPic: 'David User',
      position: 'Sales',
      endDate: '2023-09-30'
    }
  ];
    selectedVacancies!: Vacancies;
    constructor (){

    }

    ngOnInit() : void{
        this.getCompany();
    }

    getCompany(){
        // this.companyService.getCompanies(true).subscribe(result => {
        //     this.companies= result;
        // })
    }

    getPhotoUrl(base64String: string): string {
        return 'data:image/jpeg;base64,' + base64String;
      }

      
    assign(id:number){
      this.visibleAssign=true;
    }
}