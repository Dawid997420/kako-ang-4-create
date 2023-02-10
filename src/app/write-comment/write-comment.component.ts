import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../model/Article';
import { AuthService } from '../services/auth.service';
import { HttpServiceService } from '../services/http-service.service';
import { Comment } from '../model/Comment';
import { UserE } from '../model/UserE';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.css']
})
export class WriteCommentComponent implements OnInit {


  constructor( private authService :AuthService, private router: Router, private httpService :HttpServiceService) {}
  
  
  ngOnInit(): void {
    sessionStorage.setItem("previousSite","")
    this.getUserImg();
  }


  ngModel = "";

  isUserLoggedIn() {
    return this.authService.isLoggedIn();
  }


  setStyle(area : HTMLTextAreaElement) {
 
    area.style.height = (area.scrollHeight)+"px";
    return ( area.scrollHeight ) + 'px';
  }

  saveComment(text:string) {
    let article : Article  = new Article("",new Date());
    let comment:Comment = new Comment(text,"","","")
    let user:UserE = new UserE("","","",new Date(),"","");
    console.log(sessionStorage.getItem("user")|| "")
    if ( sessionStorage.getItem("chosenArticle") != null && localStorage.getItem("role") != "SPECTATOR"&& sessionStorage.getItem("user") != null && text.length > 1) 
    {
      
      article = JSON.parse(sessionStorage.getItem("chosenArticle") || "")
      comment.articleId = article.id  || "";
    
      user = JSON.parse(sessionStorage.getItem("user") || "")

      comment.userId = user.id || ""
      comment.username = user.username; 

      article = JSON.parse(sessionStorage.getItem("chosenArticle") || "")

    
      this.httpService.addComment(comment).subscribe(repsonse => {
        
        console.log(repsonse)
        sessionStorage.setItem("chosenArticle",JSON.stringify(repsonse))
        //location.reload()
        this.ngModel="";
        location.reload();

      })

    }
  }
  


  userImg= "assets/user.png";

  getUserImg() {
   let userE:UserE = new UserE("","","",new Date(),"","");

    this.httpService.getLogedUserInfo().subscribe( response=>{

      userE = response;

      this.userImg = userE.image || "assets/user.png";

    })

  }




  redirectTo() {
    sessionStorage.setItem("previousSite",this.router.url)
    //console.log(this.router.url)
    this.router.navigateByUrl("login");
  }

 

}
