import { HttpServiceService } from './../services/http-service.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../model/Article';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  articles: Article[] = [];

  rightArticles: Article[] = [];

  allImages : string[]= [];
  firstImage:string=''; 
  
  normalArticles: Article[] = [];

  

  articles1col : Article[] = [];  
  articles2col : Article[] = [];  
  articles3col : Article[] = [];  
  

  chosenArticle(id:string |undefined) {


    console.log(id);
    

  }

  getArticlesToColumns123() {

    for( let i = 0; i < this.articles.length ; i++) {


      if ( i  % 4 == 1 ) {
        this.articles1col.push(this.articles[i]);
      } else if ( i % 4 == 2 ) {
        this.articles2col.push(this.articles[i]);
      } else if ( i % 4 == 3) {
        this.articles3col.push(this.articles[i]);
      } else if ( i % 4 == 0) {
        this.rightArticles.push(this.articles[i]);
      }
   

    }


  }


  constructor(private httpService:HttpServiceService) {

  }


  ngOnInit(): void {
    
  
    this.getAllArticles();
    
  }

  getNormalArticles() {

    for ( let i = 1 ; i < 10 ; i++) {

      this.normalArticles.push(this.articles[i]);
   
    }

    
  }

  getRightArticles() {


    for ( let i = 0 ; i < 10 ; i++) {

      this.rightArticles.push(this.articles[i]);
   
    }

 

  
  }


  getAllImages(articles : Article[]) {


   let allImages : string[] = []; 

    for ( let i = 0; i < articles.length ; i++ ) {

      
      allImages.push(this.getFirstImgArtice(articles[i]));
    }


   

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


  getAllArticles() {

    this.httpService.getArticles().subscribe( (response) => {

      this.articles = response;
    //  this.getRightArticles();   
      this.getNormalArticles();
      this.getArticlesToColumns123(); 
    });


  }

  getUsersTest() {

    this.httpService.getUsers().subscribe((response) => {

      console.log(response)
    })
  }


}
