import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Article } from '../model/Article';
import { ParagraphDto } from '../model/ParagraphDto';
import { ArticleService } from '../services/article.service';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.css']
})
export class EditArticlesComponent implements OnInit {


  selected! :string;

  heightArticle!:number;

  constructor(private aritcleService :ArticleService,private httpService : HttpServiceService,
    private router:Router) {}
 
 
  ngOnInit(): void {
      
      this.selected = sessionStorage.getItem("selected") || "WSZYSTKIE";
     this.getAllArticles();
     console.log(this.selected)
    
  }




  choseCategory() {
   sessionStorage.setItem("selected",this.selected);
  }

  categoryFilter(article:Article) {

    let goodArticle = false;



    for ( let i =0 ;i < article.categories.length ; i++ ) {

      if ( this.selected == article.categories[i]) {
        goodArticle = true;
      }
      
      
    }

    if (this.selected == "WSZYSTKIE" || this.selected == undefined) {
      goodArticle = true
    }

    return goodArticle;


  }

  getFirstParagraphText(paragraphs:ParagraphDto[]) {

    let textToShow ="xd ";

    for ( let i = 0 ; i < paragraphs.length ; i++) {

      console.log(paragraphs[i].type)
        if ( "image" != paragraphs[i].type && paragraphs[i].text.length > 50 ) {
            
          textToShow = paragraphs[i].text.substring(0,130)+ "..."

          break ;
          } 

    }   

    return textToShow;
  }


  deleteArticle(article:Article) {

    console.log("article deleted")
    let id = article.id;
    this.httpService.deleteArticle(id || "").subscribe(response => {
      console.log(response);
      this.ngOnInit()
    })
  
  }

  editArticle(article:Article) {

      this.router.navigate(["editSingleArticle"]);
      
      this.aritcleService.chosenArticleToEdit = article;

  }

  articles: Article[] = [];


  getAllArticles() {
    this.httpService.getArticles().subscribe(response => {

      this.articles = response; 
    
    })
  }

  getImage(article:Article) {

   return this.aritcleService.getFirstImgArtice(article);

  }
  @ViewChild("article1")
  article1! : ElementRef ;


}
