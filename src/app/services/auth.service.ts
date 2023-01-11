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


  get isTokenOkBoolen() : boolean {
    return this.isTokenOk;
  }

 



  isLoggedIn() :boolean{


    const token = localStorage.getItem("token");

    const payload = window.atob(token!.split('.')[1]);

    const parsedPayload = JSON.parse(payload);


    return parsedPayload.exp > Date.now() / 1000 ;

  }





  constructor(private httpService :HttpServiceService) {

   }
  ngOnInit(): void {
  
  
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
