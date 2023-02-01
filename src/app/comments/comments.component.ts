import { Component, Input } from '@angular/core';
import { Comment } from '../model/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {


  @Input("comments")
  comments :Comment[] = [];



  
}
