import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserE } from '../model/UserE';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  constructor( private httpService : HttpServiceService,
    private router: Router) {}

  registerForm = new FormGroup({

    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
    birthday: new FormControl(''),
    sex : new FormControl('')

  })


  register() {

    

    if ( this.registerForm.valid &&  this.registerFormCheck() ) {


      let birthday : Date = new Date(this.registerForm.value.birthday || '');

      let user: UserE 
      = new UserE(this.registerForm.value.username || '' , this.registerForm.value.password || ''
      , this.registerForm.value.email || '' , birthday, this.registerForm.value.sex || '');


      console.log(user)
    this.httpService.register(user).subscribe( response => {

      if ( response) {

        this.router.navigate(['profile'])
      } else  {

        
      }

    })


     // console.log(this.registerForm.value.birthday)
    } 

  }



  registerFormCheck() : boolean {

    if ( this.registerForm.value.password2 !== this.registerForm.value.password) {
      
      return false;

    }
   

    let date :string | undefined | null   = this.registerForm.value.birthday;
 
    let birthday : Date = new Date(date || "");

    let timeDiff = Math.abs(Date.now() - birthday.getTime());

    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
   
    if ( age < 16 ) {


      
      return false;
    }




    return true;
  }


}
