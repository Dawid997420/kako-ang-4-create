import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../model/Comment';
import { CommentArticle } from '../model/CommentArticle';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit{


  constructor(private httpService:HttpServiceService) {

  }
  ngOnInit(): void {
    this.getCommentArticle()
  }

  @Input("comments")
  comments :Comment[] = [];

  commentsArticle:CommentArticle[]= [];


  getCommentArticle() {

    this.httpService.getCommentArticleList(this.comments).subscribe( response =>{
      this.commentsArticle = response;
      this.setDefaultImg(this.commentsArticle);
      console.log(response)
    })


  }

  setDefaultImg(comments:CommentArticle[]) {

    for( let i =0; i< comments.length ; i++) {

      if ( comments[i].image == undefined ) {

        comments[i].image = "assets/user.png";
      } else {

      }

    }

  }


  findUserImgById(comment:Comment) {
    

    //comment.userId 
   
    
  }

  
}
