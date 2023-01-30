import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../model/Article';
import { ArticleService } from '../services/article.service';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-view-art',
  templateUrl: './view-art.component.html',
  styleUrls: ['./view-art.component.css']
})
export class ViewArtComponent implements OnInit{


  chosenArticle! : Article ;


  rightArticles : Article[] = [];

  constructor(private route:ActivatedRoute ,private artService :ArticleService , private httpService : HttpServiceService) {

    
    this.getChosenArticleFromSession();
  }

  name : string = "";
  ngOnInit(): void {
    this. getRightArticles();
    this.name = this.route.snapshot.params['id'];
    console.log("router id is " + this.route.snapshot.paramMap.get("id"))
    
    
  }


  getRightArticles() {

    console.log(this.artService.articles)

        
    this.httpService.getArticles().subscribe( (response) => {

      this.rightArticles = response
     
    
    });



  }

  chosenArticle2(article:Article) {

    console.log("klik")
    this.artService.chosenArticle = article
    this.artService.enterArticle(article.topic);

   

    this.getChosenArticleFromSession();

  }

  getFirstImgArtice(article:Article) {
   return this.artService.getFirstImgArtice(article)
  }

  saveChosenArticleInSession() {
  
    sessionStorage.setItem("article", JSON.stringify(this.chosenArticle));
  }

  getChosenArticleFromSession() {


    if (sessionStorage.getItem("chosenArticle") != null && sessionStorage.getItem("chosenArticle") != undefined) {

     this.chosenArticle = JSON.parse(sessionStorage.getItem("chosenArticle") || "")
    }
    
  }
  




}
