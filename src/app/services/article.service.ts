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

    this.getAllArticles();
    //console.log("essa")
   }


   selectedSexCat(chosenCat :string) {


    if (chosenCat == "Sex") {

     let pornoArt :Article[] = [] 
     let cyberSeksArt :Article[] = [] 
     let seksoholizmArt :Article[] = []

      this.httpService.getArticlesByCategory("PORNOGRAFIA").subscribe(response =>{
        this.articlesCategory= response;
     })


      this.articlesCategory 
    }

   }

   setChosenCategory(chosen:string) {
   
    this.chosenCategory = chosen;

    sessionStorage.setItem("category" ,this.chosenCategory)
    this.getCategory(); 
    
    this.router.navigateByUrl("chosenCat/" + this.chosenCategory);
   }


   

  enterArticle( topic:string ) {


    topic = this.makeUrl(topic)
    
    

    this.router.navigateByUrl("view/"+topic);
    sessionStorage.setItem("chosenArticle",JSON.stringify(this.chosenArticle))

  }

  makeUrl(topic:string) {

    topic = topic.split(' ').join('-');
    topic = topic.split('?').join('');
    topic = topic.split('ł').join('l');
    topic = topic.split('ą').join('a');
    topic = topic.split('ó').join('o');
    topic = topic.split('ę').join('e');
    topic = topic.split('ć').join('c');
    topic = topic.split('ń').join('n');
    topic = topic.split('ź').join('z');
    topic = topic.split('ż').join('z');
    topic = topic.split('ś').join('s');
    

    return topic
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
    if ( image.length < 10) {
      image ="assets/szare.jpg"
    }

    return image;

  }





}
