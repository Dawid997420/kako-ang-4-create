import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../model/Article';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-view-art',
  templateUrl: './view-art.component.html',
  styleUrls: ['./view-art.component.css']
})
export class ViewArtComponent implements OnInit{


  chosenArticle! : Article ;


  rightArticles : Article[] = [];


  historyUrl :string[] = [];

  constructor(private route:ActivatedRoute ,private artService :ArticleService , 
    private httpService : HttpServiceService, private authService :AuthService) {

    
    this.getChosenArticleFromSession();
    

  }

  name : string = "";



  getNewUrl() {
    
    this.name = this.route.snapshot.params['id'];

    if ( this.chosenArticle == undefined || this.chosenArticle == null ||
       this.artService.makeUrl( this.chosenArticle.topic) != this.name ) {
    this.httpService.getArticleFromUrl(this.name).subscribe(repsonse =>{
      this.chosenArticle = repsonse;
      sessionStorage.setItem("chosenArticle",JSON.stringify(this.chosenArticle))
    })}

  }


  isUserLogedIn() {
    return this.authService.isLoggedIn()

  }

  ngOnInit(): void {

    
    this. getRightArticles();
    
    this.getNewUrl();

    if ( this.chosenArticle != undefined) {


      this.historyUrl.push(this.chosenArticle.topic)
    
    }    
    
  }


  getRightArticles() {

    

        
    this.httpService.getArticles().subscribe( (response) => {

      this.rightArticles = response
     
    
    });



  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event:any) {
   
  
    //this.chosenArticle.topic="";
   this.getNewUrl();
   this.getPrevious();
  }


  getPrevious() {

    
    
    let previousURL = ""

    for ( let i = 0 ; i < this.historyUrl.length ; i++) {
     
      
      let historyValue = this.artService.makeUrl(this.historyUrl[i])
   
     // console.log( this.name  + "   " + this.historyUrl[i].valueOf() )

      if ( this.name ==  historyValue && this.historyUrl[i-1] != null ) {

        
        let historyValueBefore = this.artService.makeUrl(this.historyUrl[i-1])

        previousURL = historyValueBefore
        console.log("--------------" + historyValueBefore)

        this.httpService.getArticleFromUrl(historyValueBefore).subscribe(repsonse =>{
          this.chosenArticle = repsonse;
          sessionStorage.setItem("chosenArticle",JSON.stringify(this.chosenArticle))
          console.log(this.chosenArticle)
          this.chosenArticle= JSON.parse(sessionStorage.getItem("chosenArticle") || "")
        })
     

      }

    }

  }

  chosenArticle2(article:Article) {

    this.artService.enterArticle(article.topic);
   
    //this.getNewUrl();


    this.historyUrl.push(article.topic)
    
 
    this.artService.chosenArticle = article
    this.artService.enterArticle(article.topic);

    //location.reload();
    

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

      let article:Article = JSON.parse(sessionStorage.getItem("chosenArticle") || "") ;
     this.httpService.getArticleById(article.id || "" ).subscribe( response =>  {
      console.log(response)
      sessionStorage.setItem("chosenArticle",JSON.stringify(response));
      this.chosenArticle = JSON.parse(sessionStorage.getItem("chosenArticle") || "")

     })
      
     
    }
    
  }

  getUsernameFromId(id:string) {

    this.httpService.findUserById(id).subscribe( response =>{
        
    })


  }
  




}
