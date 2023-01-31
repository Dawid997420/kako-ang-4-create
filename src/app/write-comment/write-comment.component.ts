import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.css']
})
export class WriteCommentComponent implements OnInit {


  constructor( private authService :AuthService, private router: Router) {}
  
  
  ngOnInit(): void {
    sessionStorage.setItem("previousSite","")
  }


  ngModel = "";

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }

  redirectTo() {
    sessionStorage.setItem("previousSite",this.router.url)
    //console.log(this.router.url)
    this.router.navigateByUrl("login");
  }

 

}
