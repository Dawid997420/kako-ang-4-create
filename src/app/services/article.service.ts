import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../model/Article';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  chosenArticleToEdit!:Article;

  articles!: Article[];
  chosenArticle! : Article;
  
  chosenCategory: string = "";

  articlesCategory : Article[] = []

  constructor( private router : Router , private httpService :HttpServiceService) {

    this.getAllArticles()
   }


   setChosenCategory(chosen:string) {
    
    this.chosenCategory = chosen;

    sessionStorage.setItem("category" ,this.chosenCategory)
    this.getCategory();
   }


  enterArticle( topic:string ) {


    let topicEdited = topic.split(' ').join('-');
    

    this.router.navigateByUrl("view/"+topicEdited);
    sessionStorage.setItem("chosenArticle",JSON.stringify(this.chosenArticle))

  }

  getAllArticles() {


   
    this.httpService.getArticles().subscribe( (response) => {

            this.articles = response;
            
          //  this.getRightArticles();   
        

  });
  }


  getCategory( ):Observable<Article[]> {
    this.httpService.getArticlesByCategory(sessionStorage.getItem("category") || "").subscribe(response =>{
       this.articlesCategory= response;
    })
      return this.httpService.getArticlesByCategory(sessionStorage.getItem("category") || "");

  }

  

  getFirstImgArtice( article : Article) {

    let image = "";

    for ( let i = 0 ; i < article.paragraphs.length ; i++) {

      if ( article.paragraphs[i].type == "image") {
        image = article.paragraphs[i].text ;
        break;
      }
      
    }

    return image;

  }





}
