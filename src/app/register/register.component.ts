import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserE } from '../model/UserE';
import { UserELogin } from '../model/UserELogin';
import { HttpServiceService } from '../services/http-service.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  constructor( private httpService : HttpServiceService,
    private router: Router, private authService :AuthService ) {}

  registerForm = new FormGroup({

    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
    birthday: new FormControl(''),
    sex : new FormControl('')

  })


  secretCode = "";
  showSecretCode = false;


  secretError = "" ;


  showCode() {
    this.showSecretCode = !this.showSecretCode
  }


  register() {




    if ( this.registerForm.valid && this.registerFormCheck() ) {

      if ( !this.showSecretCode) {

     
                  let birthday : Date = new Date(this.registerForm.value.birthday || '');

                  let user: UserE 
                  = new UserE(this.registerForm.value.username || '' , this.registerForm.value.password || ''
                  , this.registerForm.value.email || '' , birthday, this.registerForm.value.sex || '','');


                  console.log(user)
                this.httpService.register(user).subscribe( response => {

              
                  
                  if ( response) {

                   
                    let userLogin : UserELogin = new UserELogin(user.email,user.password)
                    this.authService.LoginWithToken(userLogin).subscribe(

                    );

                    if ( sessionStorage.getItem("previousSite") != null) {

                      this.router.navigateByUrl(sessionStorage.getItem("previousSite") || "")

                    } else {

                      this.router.navigateByUrl("")
                    }

               
                  } else  {
                    this.secretError = "typicalError"
                    
                  }
                })

      } else {                                                    


                      
                let birthday : Date = new Date(this.registerForm.value.birthday || '');

                let user: UserE 
                = new UserE(this.registerForm.value.username || '' , this.registerForm.value.password || ''
                , this.registerForm.value.email || '' , birthday, this.registerForm.value.sex || '','');


                

              this.httpService.registerAdmin(user,this.secretCode).subscribe( response => {


                
                  console.log("error")
                  if (response) {
                    let userLogin : UserELogin = new UserELogin(user.email,user.password)
                    this.authService.LoginWithToken(userLogin).subscribe(
                      
                      );
  

                    this.router.navigateByUrl("")
                    this.secretError=""

                  } else  {
                    this.secretError="secretError"
                    



                  }
 

              });


      }


   
        

    }
  }

  bithdayChange() {

    let date :string | undefined | null   = this.registerForm.value.birthday;
 
    let birthday : Date = new Date(date || "");

    let timeDiff = Math.abs(Date.now() - birthday.getTime());

    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
   
    if ( age < 16 ) {


      this.birthdayError = false;
     
    } else {
      this.birthdayError = true;
    }


  

  }


  birthdayError= false;

  registerFormCheck() : boolean {

    if ( this.registerForm.value.password2 !== this.registerForm.value.password) {
      
      return false;


    }
   

    let date :string | undefined | null   = this.registerForm.value.birthday;
 
    let birthday : Date = new Date(date || "");

    let timeDiff = Math.abs(Date.now() - birthday.getTime());

    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
   
    if ( age < 16 ) {


      this.birthdayError = true;
      return false;
    }


    this.birthdayError = false;

    return true;
  }


}
