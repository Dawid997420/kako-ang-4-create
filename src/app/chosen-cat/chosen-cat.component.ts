import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  

  wstep = "";
  obrazStartowy = "";
  tekstStartowy= "";
  tytulStartowy="";

  constructor(public articleService:ArticleService ,private httpService : HttpServiceService,
   private router:Router) {

    router.events.subscribe( value =>{
      this.wstep = router.url
       this.wstep =  this.wstep.replace("/chosenCat/","")
     console.log( this.wstep)
     this.getObrazStart();
    })

  }


  getObrazStart() {
      
    if (this.wstep =="PASJA") {

        this.obrazStartowy="assets/hobby.gif"
        this.tekstStartowy="Pasja jest ważna, bardzo ważna bo sprawia, że czujemy że warto żyć , daje nam napęd i energię do działania, do pokonywania trudności i stawiania czoła wyzwaniom. Pasja daje nam cel i energię do jego realizacji."
        this.tytulStartowy = "PASJA"

    } else if (this.wstep=="WIARA") {

      this.obrazStartowy="assets/cross.gif"
      this.tekstStartowy="Gdy będzie wam trudno, gdy będziecie w życiu przeżywać jakieś niepowodzenie, czy zawód, niech myśl wasza biegnie ku Chrystusowi, który was miłuje, jest wiernym towarzyszem i który pomaga przetrwać każdą trudność"
      this.tytulStartowy = "WIARA"
      
    } else if (this.wstep=="SPORT") {

      this.obrazStartowy="assets/sport.gif"
      this.tekstStartowy="Wysiłek fizyczny, oprócz poprawy kondycji i sylwetki, daje też lepsze samopoczucie z uwagi na wytwarzane endorfiny. Rozluźnia i daje  więcej energii, dlatego jest to bardzo korzystne zastępstwo dla uzależnienia."
      this.tytulStartowy = "SPORT"

    } else {
      this.obrazStartowy =""
      this.tekstStartowy=""
    }
    
  }


  ngOnInit(): void {

    
    this.articleService.getCategory().subscribe(response => {
      
      this.wstep = sessionStorage.getItem("category") || ""
      console.log(this.wstep)
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
