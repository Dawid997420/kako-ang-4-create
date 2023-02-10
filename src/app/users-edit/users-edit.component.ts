import { Component, OnInit } from '@angular/core';
import { UserE } from '../model/UserE';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  constructor(private httpSerivce :HttpServiceService) {}



  ngOnInit(): void {
    
    this.httpSerivce.getUsers().subscribe(response => {
      console.log(response)
      this.users = response;
    })

  }


  changeRoleToUser( user:UserE) {

      this.httpSerivce.changeUserRole(user,"USER").subscribe(  response => {
        user  = response;
        this.changeRole="";
        location.reload()
      })

  }

  changeRoleToAdmin(user:UserE) {
    
    this.httpSerivce.changeUserRole(user,"ADMIN").subscribe(  response => {
      user  = response;
      this.changeRole="";
      location.reload()
    })
  }

  users: UserE[]  = []

  areYouSure= false;

  userToDelete:UserE | null = null;
  deleteUser0(user:UserE) {

    let id:string = user.id || ""; 
    this.httpSerivce.deleteUser(id).subscribe( repsonse => {
      
    })
    
  }

  cancelDelete() {
        this.areYouSure= false;
  }


  deteilInfo(user:UserE) {

    if ( !this.areYouSure) {

    } else {

      
    }


  }

  deleteUser(user : UserE) {


    if ( !this.areYouSure) {

     this.areYouSure= true;
     this.userToDelete = user
    } else {

      
    }

    

  }


  changeRole= "" ;

  editUserRole(user : UserE) {

    
    if ( !this.areYouSure) {

      let id = user.id || "";
      if ( id == this.changeRole ) {
        
        this.changeRole= ""
      } else {
        this.changeRole = user.id || "";
      }


    } else {

      
    }

   
   
  }


}
