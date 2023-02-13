import { map, Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { UserE } from '../model/UserE';
import { UserELogin } from '../model/UserELogin';
import { ActivatedRoute, Router } from '@angular/router';

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
        //console.log(user)
        sessionStorage.setItem("user",JSON.stringify(user))
       
        localStorage.setItem("role",user.role)
        console.log(this.getRole())
        
       // console.log(this.role)
       
       
     
      })

    }
  
  }


  urlToRedirect() {

   
    ///return 
  }

  isLoggedIn() :boolean{


    if (localStorage.getItem("token") != null  ) {

      
     

      if ( localStorage.getItem("token")!.length < 10) {
       // this.router.navigateByUrl("") 
       this.urlToRedirect();
       localStorage.setItem("token","");
       localStorage.setItem("role","")
      this.role = localStorage.getItem("role") ||"SPECTATOR"
      sessionStorage.setItem("user","")
        return false
      }
    
    const token = localStorage.getItem("token");

    const payload = window.atob(token!.split('.')[1]);

    const parsedPayload = JSON.parse(payload);

    sessionStorage.setItem("role",parsedPayload.scope)

    return parsedPayload.exp > Date.now() / 1000 ;
  } else  {
    console.log("DDD")
    localStorage.setItem("token","");
    localStorage.setItem("role","")
   this.role = localStorage.getItem("role") ||"SPECTATOR"
   sessionStorage.setItem("user","")
    
    return false;
  }
  }





  constructor(private httpService :HttpServiceService , private router:Router ,private url: ActivatedRoute) {

   }
  ngOnInit(): void {

    this.role = localStorage.getItem("role") || "SPECTATOR"

  
  }




   LoginWithToken(user: UserELogin) : Observable<string> {

    return this.httpService.LoginWithToken(user)
    .pipe(map(data => {
      localStorage.setItem("token",data)
      this.setRole();
      this.router.navigateByUrl("");
      return data
    }
    ));

  }

}
