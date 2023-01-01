import { AuthService } from './../services/auth.service';
import { UserE } from './../model/UserE';
import { HttpServiceService } from './../services/http-service.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  wrongCredentials = false ;



  loginForm = new FormGroup({

    username: new FormControl(''),
    password: new FormControl('')

  })


  constructor(private httpService : HttpServiceService, private authService :AuthService) {}



  LoginGetToken() {



    if (this.loginForm.valid) {



    let user : UserE = new UserE(this.loginForm.value.password!,this.loginForm.value.username!);

    this.authService.LoginWithToken(user)
              .pipe(
                catchError(err => {

                  this.wrongCredentials = true;
                  console.log('WRONG CREDENTIALS', err);
                    this.loginForm.reset()
                  return throwError(() => err);
                  
              }))
    .subscribe(response => {
  this.loginForm.reset()
        //   console.log(response)
    });



    }



  }




}
