import { Component, OnInit } from "@angular/core";

interface Candidates {
  nik: string,
  name: string,
  email: string,
  mobileNumber: string
  }

  interface Vacancies {
    code: string,
    vacancyTitle:  string,
    hrPic:  string,
    userPic:  string,
    position:  string,
    endDate:  string
    }

@Component({
    selector : 'candidate-list',
    templateUrl : './candidate-list.component.html'
})
export class CandidateListComponent implements OnInit{
  visibleAssign:boolean=false;
    candidates: Candidates[] =  [
      {
        nik: '123786128731',
        name: 'John Doe',
        email: 'john@example.com',
        mobileNumber: '123-456-7890'
      },
      {
        nik: '126351271221',
        name: 'Jane Smith',
        email: 'jane@example.com',
        mobileNumber: '987-654-3210'
      },
    ];
    selectedCandidates!: Candidates;
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