import { Component, OnInit } from '@angular/core';
import { Article } from '../model/Article';
import { ParagraphDto } from '../model/ParagraphDto';
import { ArticleService } from '../services/article.service';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-chosen-cat',
  templateUrl: './chosen-cat.component.html',
  styleUrls: ['./chosen-cat.component.css']
})
export class ChosenCatComponent implements OnInit {


  
  constructor(public articleService:ArticleService ,private httpService : HttpServiceService) {
  }

  ngOnInit(): void {

    
    this.articleService.getCategory().subscribe(response => {

      //this.articles = response;
    }); 
    

  }



  getImage(article:Article) {

     return this.articleService.getFirstImgArtice(article);
  }



  choseArticle(article:Article) {
    this.articleService.chosenArticle = article
    this.articleService.enterArticle(article.topic);
    
  }

  getFirstParagraphText(paragraphs:ParagraphDto[]) {

    let textToShow ="xd ";

    for ( let i = 0 ; i < paragraphs.length ; i++) {

     
        if ( "image" != paragraphs[i].type && paragraphs[i].text.length > 50 ) {
            
          textToShow = paragraphs[i].text.substring(0,130)+ "..."

          break ;
          } 

    }   

    return textToShow;
  }


  




}
