import { Component, OnInit } from "@angular/core";
import { UserGetResDto } from "@dto/user/user.get.res.dto";
import { UserService } from "@serviceAdmin/user.service";
import { Title } from "@angular/platform-browser";

@Component({
    selector : 'user-list',
    templateUrl : './user-list.component.html'
})
export class UserListComponent implements OnInit{
  visibleAssign:boolean=false;
  users!: UserGetResDto[]  

    constructor (
      private userService: UserService,
      private title: Title
    ){
      this.title.setTitle('Login | Job Portal Admin')
    }

    ngOnInit() : void{
        this.getAllUser()
    }

    getAllUser(){
      this.userService.getAll().subscribe(result => {
        this.users = result
      })
    }

    getSeverity(s: string){
      switch(s){
        case 'TRUE':
          // return 'success'
      }
    }
    // getPhotoUrl(base64String: string): string {
    //     return 'data:image/jpeg;base64,' + base64String;
    //   }

    // assign(id:number){
    //   this.visibleAssign=true;
    // }
}