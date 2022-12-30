import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { UserE } from '../model/UserE';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  constructor(private httpService :HttpServiceService) {

   }


   LoginWithToken(user: UserE) : Observable<string> {

    return this.httpService.LoginWithToken(user)
    .pipe(map(data => {
      localStorage.setItem("token",data)
      console.log(localStorage.getItem("token"))
      return data
    }
    ));

  }

}
