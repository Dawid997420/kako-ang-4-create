import { AuthService } from './../services/auth.service';
import { UserE } from './../model/UserE';
import { HttpServiceService } from './../services/http-service.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { UserELogin } from '../model/UserELogin';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  wrongCredentials = false ;

//

  loginForm = new FormGroup({

    email: new FormControl(''),
    password: new FormControl('')

  })


  constructor(private router :Router,private httpService : HttpServiceService, private authService :AuthService) {}



  LoginGetToken() {



    if (this.loginForm.valid) {



    let user : UserELogin = new UserELogin(this.loginForm.value.email!,this.loginForm.value.password!);
   
    this.authService.LoginWithToken(user)
              .pipe(
                catchError(err => {

                  this.wrongCredentials = true;
                  console.log('WRONG CREDENTIALS', err);
                    this.loginForm.reset()
                  return throwError(() => err);
                  
              }))
    .subscribe(response => {
  this.loginForm.reset();

 
  sessionStorage.setItem("user",response)


    this.router.navigateByUrl("")

    this.authService.setRole()  ;
    
    location.reload();

    });



    }



  }




}
