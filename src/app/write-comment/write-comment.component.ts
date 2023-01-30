import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.css']
})
export class WriteCommentComponent {


  constructor( private authService :AuthService, private router: Router) {}


  ngModel = "";

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }


  redirectTo() {

    this.router.navigateByUrl("login");
  }

  

}
