import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { UserE } from '../model/UserE';
import { UserELogin } from '../model/UserELogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private httpService :HttpServiceService) {

   }


   LoginWithToken(user: UserELogin) : Observable<string> {

    return this.httpService.LoginWithToken(user)
    .pipe(map(data => {
      localStorage.setItem("token",data)
      console.log(localStorage.getItem("token"))
      return data
    }
    ));

  }

}
