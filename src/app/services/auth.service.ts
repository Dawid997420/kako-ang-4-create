import { map, Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { UserE } from '../model/UserE';
import { UserELogin } from '../model/UserELogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{



  private  isTokenOk = false ;

  public role = "SPECTATOR";

  getRole() {
    return this.role;
  }



  get isTokenOkBoolen() : boolean {
    return this.isTokenOk;
  }


  setRole() {
    if (  this.isLoggedIn()) {

      let user : UserE = new UserE("","","",new Date(),"","SPECTATOR")

      this.httpService.getLogedUserInfo().subscribe( response => {
        user = response;
        this.role = user.role;
        localStorage.setItem("role",user.role)
        
        
        console.log(this.role)
       
       
     
      })

    }
  
  }


  isLoggedIn() :boolean{


    if (localStorage.getItem("token") != null  ) {

    

      if ( localStorage.getItem("token")!.length < 10) {
        return false
      }
    
    const token = localStorage.getItem("token");

    const payload = window.atob(token!.split('.')[1]);

    const parsedPayload = JSON.parse(payload);


    return parsedPayload.exp > Date.now() / 1000 ;
  } else  {
    return false;
  }
  }





  constructor(private httpService :HttpServiceService) {

   }
  ngOnInit(): void {

    this.role = localStorage.getItem("role") || "SPECTATOR"

  
  }




   LoginWithToken(user: UserELogin) : Observable<string> {

    return this.httpService.LoginWithToken(user)
    .pipe(map(data => {
      localStorage.setItem("token",data)
      
      return data
    }
    ));

  }

}
