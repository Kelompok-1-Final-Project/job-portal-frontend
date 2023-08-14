import { Component, OnInit } from "@angular/core";

@Component({
    selector : 'user-list',
    templateUrl : './user-list.component.html'
})
export class UserListComponent implements OnInit{
  visibleAssign:boolean=false;
    users =  [
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